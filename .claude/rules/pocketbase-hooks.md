# PocketBase Hook Rules (pb_hooks/)

This project runs **PocketBase 0.36**. Hook files live in `pb_hooks/*.pb.js` and are auto-reloaded on file save on macOS — but auto-reload is unreliable. **Always restart PocketBase manually** (`Ctrl+C` → `npm run serve`) after editing any hook file.

---

## Rule 1: Always call `e.next()` — and call it FIRST

Every hook callback MUST call `e.next()`. Without it, PocketBase considers the chain broken and returns 400 to the client even though the underlying record operation already succeeded.

Call `e.next()` as the **very first line** of the callback. Once called, PocketBase finalises the HTTP response. Any error that occurs after `e.next()` is a post-response side effect and will never reach the client.

```js
// ✅ Correct — e.next() is first
onRecordAfterUpdateSuccess((e) => {
  e.next()
  // your logic here — errors here won't affect the client
  $app.save(someRecord)
}, "collection_name")

// ❌ Wrong — e.next() missing
onRecordAfterUpdateSuccess((e) => {
  $app.save(someRecord)  // if this throws, client gets 400
}, "collection_name")

// ❌ Wrong — e.next() is last
onRecordAfterUpdateSuccess((e) => {
  $app.save(someRecord)  // if this throws, e.next() is never called → 400
  e.next()
}, "collection_name")
```

---

## Rule 2: Never use named functions with `$app.*` calls, and use only 2-arg `findRecordsByFilter`

Two confirmed quirks in PocketBase 0.36's JSVM (goja):

1. **Named functions + `$app.*` = 400 error**, even without try-catch. When a Go host function throws inside a named JS function, the error escapes the JS call stack and bleeds back into the HTTP response — even when `e.next()` was already called. Always inline `$app.*` calls directly in the callback body.

2. **`$app.findRecordsByFilter` only reliably accepts 2 arguments** `(collection, filter)`. Passing extra arguments (sort, limit, offset) causes a goja runtime panic that propagates back as a 400 even after `e.next()`. Never pass sort/limit/offset to `findRecordsByFilter`.

```js
// ❌ Broken — named function with $app.* causes 400
function recalc(id) {
  const txns = $app.findRecordsByFilter("asset_transactions", "account_id = '" + id + "'")
  $app.save(...)
}
onRecordAfterCreateSuccess((e) => { e.next(); recalc(id) }, "asset_transactions")

// ❌ Broken — extra args to findRecordsByFilter cause 400
const txns = $app.findRecordsByFilter("asset_transactions", "account_id = '" + id + "'", "-created", 0, 0)

// ✅ Correct — inlined, 2-arg findRecordsByFilter
onRecordAfterCreateSuccess((e) => {
  e.next()
  const accountId = e.record.get("account_id")
  if (!accountId) return
  const txns = $app.findRecordsByFilter("asset_transactions", "account_id = '" + accountId + "'")
  // ... rest of logic
}, "asset_transactions")
```

## Rule 3: Never wrap `$app.*` calls in `try-catch` inside a named function

PocketBase 0.36's JSVM (goja) has a quirk: `try-catch` around `$app.*` host calls inside a **named function** interferes with internal error propagation and causes the hook to fail even when `e.next()` is called.

```js
// ❌ Broken — try-catch + named function + $app = 400 error
function doWork(e) {
  try {
    $app.findRecordsByFilter(...)
    $app.save(record)
  } catch (err) {
    console.error(err)  // this can itself throw in goja
  }
}
onRecordAfterUpdateSuccess((e) => { e.next(); doWork(e) }, "loans")

// ✅ Correct — logic inlined directly in the callback, no try-catch
onRecordAfterUpdateSuccess((e) => {
  e.next()
  const col  = $app.findCollectionByNameOrId("snapshots")
  const snap = new Record(col)
  snap.set("field", value)
  $app.save(snap)
}, "loans")
```

If defensive error handling is truly needed, use a helper that avoids `try-catch`:

```js
// ✅ Acceptable — inline the guard logic, don't use try-catch around $app calls
onRecordAfterUpdateSuccess((e) => {
  e.next()
  const userId = e.record.get("user_id")
  if (!userId) return  // guard without try-catch
  // ... rest of logic
}, "loans")
```

---

## Rule 4: Date fields must use PocketBase datetime format

PocketBase `date` type fields require a full datetime string — **not** a date-only string.

```js
// ✅ Correct — full datetime string
snap.set("date", new Date().toISOString().replace("T", " ").replace(/\.\d+Z$/, ".000Z"))
// produces: "2026-05-01 14:32:10.000Z"

// ❌ Wrong — date-only string fails PocketBase date field validation
snap.set("date", new Date().toISOString().split("T")[0])
// produces: "2026-05-01"
```

---

## Rule 5: Use `$app.*` — never the request auth context

Inside hooks, use `$app.findRecordsByFilter`, `$app.findCollectionByNameOrId`, and `$app.save`. These bypass collection rules and run with superadmin privileges. Never use `@request.auth.id` logic — that only applies in collection rules, not in hook code.

---

## Rule 6: Verify with curl before declaring fixed

After any hook change, verify directly with curl before telling the user it's fixed:

```bash
# 1. Get a superuser token
TOKEN=$(curl -s -X POST "http://127.0.0.1:8090/api/collections/_superusers/auth-with-password" \
  -H "Content-Type: application/json" \
  -d '{"identity":"<email>","password":"<password>"}' | python3 -c 'import sys,json; print(json.load(sys.stdin)["token"])')

# 2. Test the affected operation
curl -s -X PATCH "http://127.0.0.1:8090/api/collections/<collection>/records/<id>" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{"field": "value"}'
```

A 200 response with the record body = fixed. A 400 = still broken.

---

## Rule 7: Never use `findRecordById` in cascade-triggered hooks — use `findRecordsByFilter` with an existence check

When a parent record (e.g. `asset_account`) is deleted, PocketBase cascade-deletes its child records (e.g. `asset_transactions`). Each child deletion fires its own `onRecordAfterDeleteSuccess` hook. If that hook calls `$app.findRecordById` on the parent, it **throws** because the parent is already deleted — and that throw bleeds back into the account delete response as a 400, even though the delete actually succeeded.

**Symptom:** Delete returns 400 "Failed to delete record. Make sure that the record is not part of a required relation reference." — but after a page refresh, the record is gone (it WAS deleted).

**Rule:** In any `onRecordAfterDeleteSuccess` hook that looks up a parent record, use `findRecordsByFilter` and guard against an empty result instead of `findRecordById`.

```js
// ❌ Broken — throws if parent was cascade-deleted alongside child
onRecordAfterDeleteSuccess((e) => {
  e.next()
  const accountId = e.record.get("account_id")
  if (!accountId) return
  const account = $app.findRecordById("asset_accounts", accountId)  // throws when account is gone
  account.set("current_balance", 0)
  $app.save(account)
}, "asset_transactions")

// ✅ Correct — returns [] instead of throwing; guard lets us exit cleanly
onRecordAfterDeleteSuccess((e) => {
  e.next()
  const accountId = e.record.get("account_id")
  if (!accountId) return
  const matches = $app.findRecordsByFilter("asset_accounts", "id = '" + accountId + "'")
  if (matches.length === 0) return  // parent was cascade-deleted — nothing to update
  const account = matches[0]
  // ... rest of logic
  $app.save(account)
}, "asset_transactions")
```

**General rule:** Any hook that references a parent record via a relation field must use `findRecordsByFilter` + length check, never `findRecordById`, because the parent may no longer exist when the hook fires.

---

## Debugging checklist when a CRUD operation returns 400 with `"data":{}`

`{"data":{},"message":"Failed to update/create/delete record.","status":400}` with **empty data** always means a hook is the cause — field validation errors include field names in `data`.

**Special case — delete returns 400 but record disappears after refresh:** The delete succeeded; a cascade-triggered child hook crashed trying to look up the already-deleted parent via `findRecordById`. Fix: see Rule 7.

1. **Test with superuser token** — if admin also gets 400, it's 100% the hook (not auth/rules)
2. **Disable hook body** → `onRecordAfterUpdateSuccess((e) => { e.next() }, "collection")` → retest
3. If fixed: the hook logic is the problem — add back one `$app.*` call at a time to find the failing line
4. **Never trust auto-reload** — always manually restart PocketBase after hook changes
5. Verify snapshots/side-effects were actually written: `sqlite3 pb_data/data.db "SELECT * FROM <table> ORDER BY date DESC LIMIT 3;"`
