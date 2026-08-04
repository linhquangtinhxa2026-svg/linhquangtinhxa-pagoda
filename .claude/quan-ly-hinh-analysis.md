# Phân Tích: `references/quan-ly-hinh.html` → Rebuild Plan

Reference: a standalone HTML/JS tool ("Hệ Thống Quản Lý Danh Sách - Hệ Thống 2"),
persisted entirely in `localStorage` under its own key (`manager_data_system_2`,
independent from `quan-ly-cot`'s `manager_data`). Structurally and functionally
it is **byte-for-byte the same tool** as `references/quan-ly-cot.html` (same
markup, same script, same fields) — only the title, storage key, and a few
export/import filenames were changed to "Hệ Thống 2" / `_HT2` suffixes.

**Domain meaning (confirmed with user):** this second registry tracks where
each deceased person's **memorial photo/tablet ("hình thờ")** is displayed —
a separate physical location/section of the pagoda from where their ashes urn
is physically stored (which `quan-ly-cot` / `remains` already tracks). Same
four pieces of information are recorded, just against a different placement.

This doc lists everything the reference tool does, exactly as in
`quan-ly-cot-analysis.md`, since the two tools are functionally identical —
only the field meaning of "location" and the target routes/collection differ.

---

## 1. Features

Identical to `quan-ly-cot.html` (see `.claude/quan-ly-cot-analysis.md` §1 for
the full breakdown): stats widgets (total / filtered / has-phone), add/edit
form (fullName, ageOfDeath, phone, privateInfo textarea) with inline
validation and auto-capitalization, accent-insensitive live search, location
quick-filter dropdown (Lầu 1, Lầu 2, Mặt trước, Mặt trong, GĐ — filtered
against the notes field, same as before), sort dropdown, paginated table (50
rows/page) with search-term highlighting, inline edit with row highlight,
delete with confirm, Excel export (SheetJS `.xlsx`), TXT export/import (JSON
blob), Excel import (column-mapped), auto-backup every 35 additions
(HT2-suffixed filenames), wipe-all with double confirm, back-to-top button.

No feature differences from `quan-ly-cot.html` — this is a parallel,
independently-stored copy of the same tool.

---

## 2. Visual / design language (reference only — NOT carried over)

Identical to `quan-ly-cot.html` — same CSS, same color-coded buttons, same
card-on-gray layout. As with the first rebuild, this is fully replaced by
`.claude/rules/admin-design.md` (admin page) and
`.claude/rules/marketing-design.md` (public page); nothing from the reference
stylesheet carries over.

---

## 3. Mapping: reference feature → rebuild

Same structural mapping as `quan-ly-cot-analysis.md` §3, with a different
target collection, routes, and location-field meaning:

| Reference feature | Rebuild equivalent |
|---|---|
| `localStorage` array (`manager_data_system_2`) | new, independent PocketBase collection: **`memorial_photos`** |
| `fullName` | `full_name` (text, required) |
| `ageOfDeath` (free text) | `age_at_death` (**number**, same convention as `remains`) |
| `phone` | `phone` (text) |
| `privateInfo` (notes + embedded location) | split into `display_location` (text — where the memorial photo/tablet is displayed, e.g. "Lầu 1, Dãy A, Bàn số 5") and `private_info` (text — free notes). Same split rationale as `storage_location` in `remains`: the core need is finding the exact placement quickly. |
| Location quick-filter dropdown | filter against `display_location` |
| Sort dropdown | `sort` param on `getList` |
| Add/Edit form | `MemorialPhotoForm.tsx` (RHF + Yup), same pattern as `RemainForm.tsx` |
| Table + pagination | shadcn `Table`, PocketBase `getList` pagination — identical component pattern to `RemainsTable.tsx` |
| Stats widgets | total / with-phone stat cards, identical pattern to `RemainsStatsCards.tsx` |
| Excel/TXT export & import, wipe-all | kept, identical pattern to `RemainsImportExport.tsx` |
| Auto-backup every 35 adds, back-to-top button | **dropped**, same reasoning as `remains` (moot once PocketBase is the source of truth) |
| No auth at all | superuser-only write (`createRule`/`updateRule`/`deleteRule`), public read (`listRule`/`viewRule` = `""`) |
| Single page | two pages, mirroring the `remains` pair: **`/trang-chu/quan-ly-hinh`** (full CRUD, superuser) and **`/tim-hinh`** (search-only, public) |

---

## 4. Proposed naming (for review)

Following the same delegation as the `remains` build:

- **PocketBase collection:** `memorial_photos`
- **Admin route:** `/trang-chu/quan-ly-hinh` (sidebar item: "Quản Lý Hình")
- **Public route:** `/tim-hinh` (nav: "Tìm Kiếm" ▸ "Tìm Hình", alongside the
  existing "Tìm Cốt" entry in the same dropdown)
- **Fields:** `full_name`, `age_at_death` (number), `phone`,
  `display_location`, `private_info` — same shape as `remains`, just renamed
  `storage_location` → `display_location` to match the domain (where the
  photo/tablet is displayed, not where ashes are stored)

## 5. Explicitly out of scope for the rebuild

Same as `remains`: auto-backup-every-35, back-to-top button, and all
reference-tool styling.
