# PocketBase Guide

Complete reference for working with PocketBase in this project.

---

## Folder Structure

```
nailtech/
├── pocketbase              # PocketBase binary (run directly)
├── pb_data/                # Runtime data (DO NOT commit)
│   ├── data.db             # SQLite database
│   ├── auxiliary.db        # Internal PocketBase state
│   └── storage/            # Uploaded files (by record ID)
│       └── <collectionId>/
│           └── <recordId>/
│               └── <filename>
└── pb_migrations/          # Version-controlled migration scripts
    ├── 1738481000_created_posts.js
    ├── 1738481002_created_services.js
    └── ...
```

`pb_data/` should be in `.gitignore`. `pb_migrations/` is committed.

---

## Running PocketBase

```bash
npm run serve        # Start PocketBase at http://127.0.0.1:8090
npm run migration    # Run pending migrations (./pocketbase migrate up)
```

Admin UI: `http://127.0.0.1:8090/_/`

---

## Migration Files

### Naming Convention

```
{unix_timestamp}_{description}.js
```

Examples:
- `1738481000_created_posts.js`
- `1738741000_update_collection_rules.js`
- `1739500002_seed_gallery.js`

Use sequential timestamps to control migration order. For a new migration, use `Date.now()` at creation time.

### Migration Structure

Every migration file exports a `migrate(up, down)` call. PocketBase provides global variables: `Collection`, `Record`, and the `app`/`db` argument.

```js
migrate((app) => {
  // UP: apply changes
}, (app) => {
  // DOWN: rollback changes
});
```

### Pattern 1: Create a Collection

```js
migrate((app) => {
  const collection = new Collection({
    name: "technicians",
    type: "base",
    fields: [
      { name: "name",          type: "text",   required: true, max: 200 },
      { name: "bio",           type: "text",   max: 1000 },
      { name: "is_active",     type: "bool" },
      { name: "display_order", type: "number", min: 0 },
      // autodate fields are added automatically — created/updated are always present
    ],
    listRule:   "",                      // public read
    viewRule:   "",
    createRule: "@request.auth.id != ''", // auth required
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
    indexes: [
      "CREATE INDEX idx_technicians_active ON technicians (is_active)"
    ]
  });

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("technicians");
  app.delete(collection);
});
```

### Pattern 2: Create a Collection with a Relation

Resolve the related collection's ID first, then reference it.

```js
migrate((app) => {
  const categories = app.findCollectionByNameOrId("service_categories");

  const collection = new Collection({
    name: "services",
    type: "base",
    fields: [
      { name: "name",        type: "text",     required: true },
      { name: "category_id", type: "relation", collectionId: categories.id, maxSelect: 1, cascadeDelete: false },
    ],
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
  });

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("services");
  app.delete(collection);
});
```

### Pattern 3: Create a Collection with File Upload

```js
migrate((app) => {
  const collection = new Collection({
    name: "gallery_assets",
    type: "base",
    fields: [
      {
        name:      "image",
        type:      "file",
        required:  true,
        maxSelect: 1,
        maxSize:   8388608,  // 8 MB in bytes
        mimeTypes: ["image/jpeg", "image/png", "image/webp"],
        thumbs:    ["300x300", "800x600"],  // auto-generated thumbnails
        protected: false,
      },
      { name: "alt_text", type: "text", max: 200 },
    ],
    listRule:   "",
    viewRule:   "",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
  });

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("gallery_assets");
  app.delete(collection);
});
```

### Pattern 4: Update an Existing Collection (rules, fields)

```js
migrate((app) => {
  const collection = app.findCollectionByNameOrId("appointments");
  collection.listRule = "@request.auth.id != ''";
  collection.viewRule = "@request.auth.id != ''";
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("appointments");
  collection.listRule = "";
  collection.viewRule = "";
  app.save(collection);
});
```

### Pattern 5: Seed Data

```js
migrate((app) => {
  const collection = app.findCollectionByNameOrId("service_categories");

  const seeds = [
    { name: "Manicure", slug: "manicure", display_order: 1 },
    { name: "Pedicure", slug: "pedicure", display_order: 2 },
  ];

  for (const seed of seeds) {
    try {
      app.findFirstRecordByFilter("service_categories", `slug="${seed.slug}"`);
      // already exists — skip
    } catch {
      const record = new Record(collection);
      record.set("name", seed.name);
      record.set("slug", seed.slug);
      record.set("display_order", seed.display_order);
      app.save(record);
    }
  }
}, (app) => {
  // Seed rollback is usually a no-op — note it explicitly
  console.log("Rollback: seed data not removed, clean up manually if needed");
});
```

### Field Types Reference

| Type       | Example |
|------------|---------|
| `text`     | `{ name: "title", type: "text", required: true, max: 200 }` |
| `number`   | `{ name: "price", type: "number", min: 0 }` |
| `bool`     | `{ name: "is_active", type: "bool" }` |
| `date`     | `{ name: "published_at", type: "date" }` |
| `email`    | `{ name: "email", type: "email" }` |
| `url`      | `{ name: "image_url", type: "url" }` |
| `editor`   | `{ name: "content", type: "editor" }` — rich text (HTML) |
| `json`     | `{ name: "steps", type: "json" }` |
| `select`   | `{ name: "status", type: "select", values: ["pending", "confirmed"], maxSelect: 1 }` |
| `relation` | `{ name: "category_id", type: "relation", collectionId: cats.id, maxSelect: 1 }` |
| `file`     | `{ name: "image", type: "file", maxSelect: 1, maxSize: 8388608, mimeTypes: [...] }` |

`created` and `updated` autodate fields are always present — never define them manually.

### Access Rule Patterns

```js
listRule:   ""                           // public (anyone can list)
listRule:   "@request.auth.id != ''"    // authenticated users only
listRule:   "is_active = true"          // filter-based public access
viewRule:   "@request.auth.id = author_id"  // only the record's owner
createRule: ""                           // anyone can create (e.g., contact form)
deleteRule: null                         // nobody can delete via API
```

---

## Authentication

This project supports two user types: regular `users` and `_superusers` (PocketBase admins).

### Auth is managed in `AdminAuthContext`

```tsx
import { useAdminAuth } from '@/contexts/AdminAuthContext'

const { user, loading, signIn, signOut } = useAdminAuth()
```

### Sign In (tries users, then _superusers)

```tsx
// AdminAuthContext handles both collections automatically
await signIn(email, password)
```

Internally:
```ts
// 1. Try regular users collection
await pb.collection("users").authWithPassword(email, password)

// 2. Fall back to superusers if users auth fails
await pb.collection("_superusers").authWithPassword(email, password)
```

### Sign Up

```ts
await pb.collection("users").create({
  email,
  password,
  passwordConfirm: password,
  emailVisibility: true,
  first_name: firstName,
  last_name: lastName,
  role: "admin",
  verified: false,  // superadmin manually approves
})
```

### Sign Out

```ts
pb.authStore.clear()
```

### Check Auth in Admin Pages

```tsx
const { user, loading: authLoading } = useAdminAuth()

useEffect(() => {
  if (!authLoading && !user) {
    router.push('/admin/login')
  }
}, [authLoading, user, router])
```

### Password Reset & Email Verification

```ts
await pb.collection("users").requestPasswordReset(email)
await pb.collection("users").requestVerification(email)
```

---

## File Uploads

### Upload a File (in an admin component)

Use a `FormData` object — PocketBase handles file fields as multipart.

```tsx
const formData = new FormData()
formData.append("image", file)       // file is a File object from <input>
formData.append("alt_text", altText)

await pb.collection("gallery_assets").create(formData)
```

### Upload with Other Fields

```tsx
const formData = new FormData()
formData.append("name", values.name)
formData.append("image", values.imageFile)  // File object

await pb.collection("technicians").create(formData)
```

### Get the File URL

```ts
import { pb } from '@/lib/pocketbase'

const url = pb.files.getURL(record, record.image)
// → http://127.0.0.1:8090/api/files/{collectionId}/{recordId}/{filename}
```

With a thumbnail (must be defined in the migration's `thumbs` array):

```ts
const url = pb.files.getURL(record, record.image, { thumb: "300x300" })
```

### Replace a File on Update

```tsx
const formData = new FormData()
formData.append("image", newFile)

await pb.collection("gallery_assets").update(recordId, formData)
```

### Delete a File Field (set to empty)

```ts
await pb.collection("technicians").update(recordId, { image: null })
```

---

## CRUD Operations

All admin CRUD uses `pb` from `@/lib/pocketbase` (authenticated client). Always include `requestKey: null`.

### List All Records

```ts
const items = await pb.collection("technicians").getFullList({
  sort: "display_order",
  requestKey: null,
})
```

### List with Pagination

```ts
const result = await pb.collection("services").getList(page, perPage, {
  filter: "is_active = true",
  sort: "-created",
  requestKey: null,
})
// result.items, result.totalItems, result.totalPages
```

### Fetch One by ID

```ts
const record = await pb.collection("services").getOne(id, {
  expand: "category_id",
  requestKey: null,
})
```

### Fetch One by Filter

```ts
const record = await pb.collection("services").getFirstListItem(
  `slug = "${slug}" && is_active = true`,
  { expand: "category_id", requestKey: null }
)
```

### Create

```ts
const record = await pb.collection("technicians").create({
  name: "Alice",
  bio: "Expert in gel nails",
  is_active: true,
  display_order: 1,
})
```

### Update

```ts
await pb.collection("technicians").update(id, {
  name: "Alice Updated",
  is_active: false,
})
```

### Delete

```ts
await pb.collection("technicians").delete(id)
```

### Expand Relations

```ts
const service = await pb.collection("services").getOne(id, {
  expand: "category_id",
  requestKey: null,
})

// Access expanded data
const categoryName = service.expand?.category_id?.name
```

### Filter Syntax

```ts
// Equality
filter: 'is_active = true'
filter: `slug = "${slug}"`

// AND / OR
filter: 'is_active = true && is_featured = true'
filter: 'status = "pending" || status = "confirmed"'

// Relation filter
filter: `category_id = "${categoryId}"`

// Auth-based
filter: '@request.auth.id != ""'
```

---

## PocketBase Clients — Which to Use

| Context | Import | Purpose |
|---------|--------|---------|
| Admin pages & components | `import { pb } from '@/lib/pocketbase'` | Authenticated CRUD |
| Public React Query hooks | `import { pb } from '@/lib/pocketbase-client'` | Unauthenticated public reads |
| Server Components (SSR) | `import { getPocketBaseServer } from '@/lib/pocketbase-server'` | Server-side reads |

All three clients have `pb.autoCancellation(false)` set. Always add `requestKey: null` in every `.getFullList` / `.getList` / `.getOne` call inside React components or hooks to avoid React Query cancellation conflicts.
