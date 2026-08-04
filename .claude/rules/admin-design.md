# Admin Design System

All pages and components under `src/app/admin/` and `src/components/admin/` follow a two-surface system: a dark slate sidebar + light content area. This is the agreed design direction — do not deviate from it.

---

## Two-Surface Layout

| Surface | Value | Scope |
|---------|-------|-------|
| Sidebar | `bg-slate-800` (`#1e293b`) | `AdminSidebar` only |
| Page background | `bg-[#F1F5F9]` | `admin/layout.tsx` main wrapper |
| Top nav | `bg-white border-b border-gray-200` | `AdminTopNav` |
| Cards / panels | `bg-white border border-gray-200 shadow-sm` | All content cards |

---

## Colour Palette

| Role | Value | Usage |
|------|-------|-------|
| Page background | `bg-[#F1F5F9]` | Layout wrapper |
| Card surface | `bg-white` | All content cards |
| Card border | `border-gray-200` | Card outlines |
| Table header bg | `bg-gray-100` | `<TableRow>` in `<TableHeader>` |
| Table header text | `text-gray-500 text-xs font-semibold uppercase tracking-wider` | `<TableHead>` cells |
| Table row divider | `border-b border-gray-100` | `<TableRow>` in `<TableBody>` |
| Table row hover | `hover:bg-gray-50` | `<TableRow>` in `<TableBody>` |
| Primary text | `text-gray-800` | Headings, card titles |
| Secondary text | `text-gray-500` | Subtext, descriptions |
| Muted text | `text-gray-400` | Timestamps, meta, placeholders |
| Primary action (amber) | `bg-[#8B6A2E] hover:bg-[#7a5c25] active:scale-[0.97] text-white` | CTA buttons (Add, Save, Create) |
| Brand accent (amber) | `#8B6A2E` | Primary buttons, avatar, spinner, active bar, focus rings, edit hover |
| Destructive | `hover:bg-red-50 hover:text-red-600` | Delete button hover |
| Logout hover | `hover:bg-red-500/10 hover:text-red-400` | Sidebar logout |

---

## Sidebar (`bg-slate-800`)

The sidebar uses dark slate — all text and icons must be readable on this dark background.

| Element | Class |
|---------|-------|
| Sidebar wrapper | `bg-slate-800` |
| Brand divider / section dividers | `border-white/10` or `bg-white/10` |
| Section label ("MENU", "SẮPMẮT") | `text-[#8D99AE] text-xs uppercase tracking-widest font-medium` |
| Inactive nav item | `text-[#8D99AE] hover:bg-white/5 hover:text-white` |
| Active nav item | `bg-white/10 text-white font-medium` |
| Active indicator dot | `ml-auto w-1.5 h-1.5 rounded-full bg-[#8B6A2E]` |
| Coming-soon item | `text-[#4B5563] cursor-not-allowed` |
| Coming-soon badge | `bg-white/5 text-[#4B5563] text-[10px] px-2 py-0.5 rounded uppercase` |
| Logout button | `text-[#8D99AE] hover:bg-red-500/10 hover:text-red-400` |

**Active state logic** — use `exact: true` on nav items that should not match child routes:
```ts
const isActive = item.exact
  ? pathname === item.href
  : pathname === item.href || pathname.startsWith(item.href + "/");
```

---

## Cards

- Always: `bg-white rounded-xl border border-gray-200 shadow-sm`
- Card header (title bar): `px-6 py-4 border-b border-gray-100`
- Card title: `text-gray-800 text-sm font-semibold`
- Card body: `p-6`
- Never add extra box-shadows or gradient overlays on cards

---

## Tables (shadcn `<Table>`)

Always use shadcn `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`.

```tsx
<TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-200">
  <TableHead className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
    Column
  </TableHead>
</TableRow>
```

Body rows:
```tsx
<TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100">
```

Category / status badges: `rounded-full` pill, light-tinted bg per category:
- Use `bg-amber-50 text-amber-700 border border-amber-200` pattern
- Each category/status gets its own color entry in a `STYLES` record

Action buttons (icon-only): `p-2 rounded-lg text-gray-400 hover:text-[#8B6A2E] hover:bg-[#8B6A2E]/8` for edit, `hover:text-red-600 hover:bg-red-50` for delete.

Use shadcn `<Button variant="ghost" size="icon">` for all icon-only controls (move, delete, expand, etc.).

---

## Buttons

| Type | Class |
|------|-------|
| Primary CTA | `bg-[#8B6A2E] hover:bg-[#7a5c25] active:scale-[0.97] text-white text-sm font-medium rounded-lg px-4 py-2.5 transition-all duration-150` |
| Secondary / cancel | `border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-lg px-4 py-2.5` |
| Destructive | `bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg px-4 py-2` |

All buttons: always add `transition-colors duration-150 cursor-pointer disabled:opacity-50`.

---

## Form Inputs

Always use shadcn `<Input>`, `<Textarea>`, `<Label>`, and `<Select>` — never raw HTML form elements.

Amber focus ring constant (apply to every input and textarea):
```ts
const amberFocus = "focus-visible:border-[#8B6A2E] focus-visible:ring-[#8B6A2E]/20"
```

Select amber ring:
```ts
const selectFocus = "focus:ring-[#8B6A2E]/20 data-[state=open]:border-[#8B6A2E]"
```

Label class: `text-sm font-semibold text-gray-700`

Form field wrapper: `space-y-1.5` between label and input.

---

## Loading & Empty States

- Spinner color: `text-[#8B6A2E]` throughout (brand amber — single color, no blue)
- Empty state (table/list): centered icon in `w-12 h-12 rounded-full bg-gray-100`, `text-gray-400` icon, `text-gray-500 text-sm` message
- Empty state (inline card area): `py-8 text-center text-gray-400 text-sm border border-dashed border-gray-200 rounded-lg`
- Loading row inside card: `flex items-center justify-center py-20 gap-3`

---

## Top Nav (`AdminTopNav`)

- Wrapper: `bg-white border-b border-gray-200 h-16 px-6`
- Page title: `text-gray-800 text-base font-semibold`
- Breadcrumb: `text-gray-400 text-xs` — format: `Admin / {Page Title}`
- Avatar fallback: `bg-[#8B6A2E]/10 border border-[#8B6A2E]/20 text-[#8B6A2E]`

---

## Typography

- `font-sans` (Nunito Sans) throughout — **never** `font-serif` (Cormorant) in admin pages

### Type scale

| Role | Class |
|------|-------|
| Page title (h2) | `text-xl font-semibold text-gray-800` |
| Page subtitle | `text-sm text-gray-500 mt-0.5` |
| Top nav title | `text-base font-semibold text-gray-800` |
| Top nav breadcrumb | `text-xs text-gray-400` |
| Card / section title (h3) | `text-sm font-semibold text-gray-800` |
| Card meta / count | `text-xs text-gray-400 mt-0.5` |
| Sidebar section label | `text-xs font-medium uppercase tracking-widest text-[#8D99AE]` |
| Sidebar nav item | `text-sm font-medium` |
| Table header cell | `text-xs font-semibold uppercase tracking-wider text-gray-500` |
| Table body — primary cell | `text-sm font-medium text-gray-800` |
| Table body — secondary cell | `text-sm text-gray-600` |
| Table body — muted cell | `text-sm text-gray-500 tabular-nums` |
| Table body — micro (slug, mono) | `text-xs font-mono text-gray-400` |
| Badge / pill | `text-xs font-medium` |
| Form label | `text-sm font-medium text-gray-700` |
| Form input | `text-sm text-gray-800` |
| Form hint / helper | `text-xs text-gray-400 mt-1` |
| Button | `text-sm font-medium` |
| Toast / notification | `text-sm` |
| Coming-soon badge | `text-[10px] uppercase tracking-wide` |

---

## Card Section Headings (form pages)

For multi-card form layouts, each card header uses an amber left accent bar:
```tsx
<div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
  <span className="w-[3px] h-5 rounded-full bg-[#8B6A2E]" />
  <h3 className="text-base font-bold text-gray-900">Section Title</h3>
</div>
```

Optional right-side badge for counts:
```tsx
<Badge variant="secondary" className="text-xs text-gray-500 font-medium">
  {count} items
</Badge>
```

---

## Content Block / List-Item Editors

When building editors that manage a list of typed items (content blocks, product specs, FAQ entries, etc.):

### Block card pattern
```tsx
<div className={`border border-gray-200 border-l-[3px] rounded-lg bg-white ${accentClass} shadow-[0_1px_3px_0_rgb(0,0,0,0.04)]`}>
  {/* Header: type badge + move/delete controls */}
  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
    <Badge variant="outline" className={`text-[11px] font-medium px-2 py-0 h-5 ${badgeClass}`}>
      Block Type
    </Badge>
    <div className="flex items-center gap-0.5">
      <Button type="button" variant="ghost" size="icon" className="h-7 w-7 ...">...</Button>
    </div>
  </div>
  {/* Body: inputs */}
  <div className="p-3 space-y-2">...</div>
</div>
```

### Color accent system
Assign each item type a left border color and a matching Badge tint — creates instant visual differentiation without noise:

| Type | Left border | Badge class |
|------|------------|-------------|
| Default/neutral | `border-l-gray-300` | `bg-gray-100 text-gray-600 border-gray-200` |
| Primary/brand | `border-l-[#8B6A2E]` | `bg-[#8B6A2E]/10 text-[#8B6A2E] border-[#8B6A2E]/20` |
| Secondary A | `border-l-violet-300` | `bg-violet-50 text-violet-600 border-violet-200` |
| Secondary B | `border-l-emerald-300` | `bg-emerald-50 text-emerald-700 border-emerald-200` |
| Secondary C | `border-l-sky-300` | `bg-sky-50 text-sky-700 border-sky-200` |

Define as `Record<ItemType, string>` constants — one for border accent, one for badge class.

### Add-item button
Use `DropdownMenu` (shadcn/Base UI) for "add new item" when there are multiple types. Trigger styled as a dashed amber outline button:
```tsx
<DropdownMenuTrigger className="flex items-center justify-center gap-2 w-full rounded-md border border-dashed border-[#8B6A2E]/30 bg-transparent px-4 py-2 text-sm text-[#8B6A2E] hover:bg-[#8B6A2E]/5 hover:border-[#8B6A2E]/50 transition-colors duration-150 cursor-pointer">
  + Add item
</DropdownMenuTrigger>
```

Each `DropdownMenuItem` shows a small color-coded icon badge (matching the block accent) beside the label.

### Reference implementation
`src/components/admin/posts/ContentBlockEditor.tsx`

---

## What NOT to use in admin pages

- ❌ `bg-[#1C2434]` — replaced by `bg-slate-800` for sidebar, `bg-gray-100` for table headers
- ❌ `bg-[#3C50E0]` / `hover:bg-[#3347c8]` — generic SaaS blue, replaced by brand amber `#8B6A2E`
- ❌ `hover:bg-blue-50 hover:text-[#3C50E0]` — blue edit hover, replaced by amber `hover:bg-[#8B6A2E]/8 hover:text-[#8B6A2E]`
- ❌ `focus:border-[#3C50E0]` — blue focus ring, replaced by `focus:border-[#8B6A2E]`
- ❌ Dark table headers with light text — table headers are always `bg-gray-50 text-gray-500`
- ❌ `bg-zinc-*` — dark surfaces outside the sidebar
- ❌ `text-amber-*` — gold from the marketing site
- ❌ `var(--font-serif)` / Cormorant — marketing font
- ❌ Luxury decorative elements (shimmer lines, glow orbs, gradient overlays)
- ❌ `shadow-none` on cards — cards always have `shadow-sm`
- ❌ Raw `<table>` / custom CSS grid for data tables — always use shadcn `<Table>`

---

## Reference implementations

| File | What it shows |
|------|---------------|
| `src/components/admin/layout/AdminSidebar.tsx` | Dark slate sidebar, active state logic, coming-soon items |
| `src/components/admin/layout/AdminTopNav.tsx` | Top nav, `getPageTitle()` breadcrumb pattern |
| `src/app/admin/layout.tsx` | Two-surface layout wrapper, auth guard with `useSyncExternalStore` |
| `src/components/admin/posts/PostsContainer.tsx` | Page header + CTA button + card wrapper pattern |
| `src/components/admin/posts/PostsTable.tsx` | shadcn Table, `bg-gray-50` header, pill badges, icon action buttons |
| `src/components/admin/posts/PostFormPage.tsx` | Multi-card form layout, input/label classes, back navigation |
| `src/components/admin/posts/DeletePostDialog.tsx` | Confirmation dialog, white modal, red destructive pattern |
| `src/components/admin/posts/ContentBlockEditor.tsx` | Typed list-item editor: color accent bars, badge labels, DropdownMenu add button, ghost icon buttons |
