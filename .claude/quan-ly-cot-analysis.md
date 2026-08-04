# Phân Tích: `references/quan-ly-cot.html` → Rebuild Plan

Reference: a standalone HTML/JS tool ("Hệ Thống Quản Lý Danh Sách") that manages
a list of deceased individuals' cremated remains records, persisted entirely in
`localStorage`. This doc lists everything it does and how it looks, as the basis
for the PocketBase-backed rebuild at `/trang-chu/quan-ly-cot` (admin) and
`/tim-cot` (public, read-only).

---

## 1. Features

### Stats widgets
- **Tổng hệ thống** — total record count
- **Đang hiển thị (Đã lọc)** — count after search/filter applied
- **Đã có Số Điện Thoại** — count of records with a non-empty phone number

### Add / Edit form
Fields: `Họ và tên` (required), `Tuổi mất`, `Số điện thoại`, `Thông tin riêng`
(multi-line textarea — used for free-text notes **and** as the substring target
for the location quick-filter below).
- Enter key submits (Shift+Enter allowed in the textarea for newlines)
- Full name auto-capitalized per word on submit
- Same form doubles as the edit form: clicking "Sửa" on a row loads its values
  in, changes the heading/button text, and adds a "Hủy Bỏ" cancel button;
  the row being edited is visually highlighted (`editing-row`, pale yellow)

### Search & filter
- Live search-as-you-type across name, age, phone, and notes
- **Accent-insensitive**: typing "nguyen" matches "Nguyễn" (custom Vietnamese
  tone-stripping function) — a deliberate, load-bearing feature of the original
- Matched substrings are highlighted inline in the table (orange highlight span)
- **Location quick-filter dropdown**: Lầu 1, Lầu 2, Mặt trước, Mặt trong, GĐ —
  filters by substring match against the notes field (there is no separate
  location field in the original)
- **Sort dropdown**: default (insertion order), name A→Z, age-at-death descending

### List / table
- Paginated, 50 rows per page, with page-number controls (both above and below
  the table) including first/last/ellipsis and prev/next
- Sticky table header while scrolling
- "Back to top" floating button once scrolled past 300px

### Data management (danger zone / import-export)
- **Export to `.txt`** — dumps the raw JSON array
- **Export to `.xlsx`** — styled Excel export via SheetJS (client-side `xlsx` lib),
  fixed column widths
- **Import from `.txt`** — re-loads a previously exported JSON array, overwrites
  current data (confirm dialog), tolerates a couple of legacy field-name variants
- **Import from `.xlsx`** — maps Vietnamese column headers back to fields,
  overwrites current data (confirm dialog)
- **Auto-backup**: every 35 new records added in a session, silently
  triggers an Excel download + shows a dismissable banner notice
- **Xóa Sạch Dữ Liệu (wipe all)** — double `confirm()` dialog, clears everything

### Persistence
Everything lives in `localStorage` under a single key (`manager_data`) — no
backend, no auth, no multi-device sync, no access control. This is the core
problem being solved by moving to PocketBase.

---

## 2. Visual / design language (reference only — NOT carried over)

- Centered white card (`max-width: 1100px`) on a flat light-gray page background
- Segoe UI / system sans-serif throughout, rounded corners (`border-radius: 6-12px`)
- Color-coded buttons: blue (primary/default), green (export), orange (import),
  yellow (edit), red (delete/danger)
- Light-gray section backgrounds (`#f8f9fa`) with a thin border, used to visually
  group the stats/form/search/list blocks
- Small colored left-border accent on stat cards (blue/green/orange)
- Sticky gray table header, hover row highlight, yellow "currently editing" row
- Inline orange-on-yellow highlight spans for matched search text

**This entire visual system is replaced.** The rebuilt admin page follows
`.claude/rules/admin-design.md` exactly instead: dark slate sidebar + white
content cards, amber `#8B6A2E` accents, shadcn `Table`/`Button`/`Dialog`
primitives, `rounded-xl` cards with `shadow-sm`, gray-50 table headers. No
color-coded buttons, no `border-radius` grab-bag, no colored left-border stat
cards outside the documented amber accent bar pattern.

---

## 3. Mapping: reference feature → rebuild

| Reference feature | Rebuild equivalent |
|---|---|
| `localStorage` array of records | PocketBase `remains` collection (see migration) |
| `fullName` | `full_name` (text, required) |
| `ageOfDeath` (free text) | `age_at_death` (**number**, per user decision — stricter than original) |
| `phone` | `phone` (text) |
| `privateInfo` (notes + embedded location) | split into `storage_location` (text — dedicated field so staff can find the exact position, the stated core need) and `private_info` (text — free notes) |
| Location quick-filter dropdown (substring match) | filter against the new dedicated `storage_location` field |
| Accent-insensitive client-side search over all records | **server-side paginated PocketBase filter** (`~` contains) — accepted tradeoff, not accent-insensitive (per user decision) |
| Sort dropdown | `sort` param on `getList` (`full_name`, `-age_at_death`, `-created`) |
| Add/Edit form | `RemainForm.tsx` (RHF + Yup), used by `AddRemainModal.tsx` / `EditRemainModal.tsx` |
| Table + pagination | shadcn `Table` in `RemainsTable.tsx`, PocketBase `getList` pagination |
| Stats widgets | `RemainsStatsCards.tsx`, derived from query results / a lightweight count query |
| Excel/TXT export & import, wipe-all | `RemainsImportExport.tsx` (kept — user opted for full parity) |
| Auto-backup every 35 adds, back-to-top button | **dropped** — auto-backup was a localStorage-loss mitigation, moot once PocketBase is the source of truth; back-to-top is a minor affordance not requested and not part of the admin design system reference pages |
| No auth at all | superuser-only write access (`createRule`/`updateRule`/`deleteRule`), public read (`listRule`/`viewRule` = `""`) for the `/tim-cot` public page |
| Single page, no public/admin split | two pages: `/trang-chu/quan-ly-cot` (full CRUD, superuser) and `/tim-cot` (search-only, public, marketing design system) |

---

## 4. Explicitly out of scope for the rebuild

- Auto-backup-every-35-records behavior (no longer needed — PocketBase persists immediately)
- Back-to-top floating button (not part of the admin design system's established patterns; can be added later if requested)
- Any styling from the reference HTML (blue/green/orange/red buttons, card-on-gray layout, etc.) — fully replaced by `admin-design.md` / `marketing-design.md`
