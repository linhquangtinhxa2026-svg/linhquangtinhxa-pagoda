# Marketing / Public Page Design System

All public-facing pages (everything under `src/app/` **outside** `src/app/admin/` —
home, `san-pham` (products), `bo-suu-tap` (collections), `ve-chung-toi` (about),
`tin-tuc` (blog), `lien-he` (contact), `thanh-toan` (checkout), `cam-on`
(thank-you)) and their components in `src/components/public/` follow this system.
This is a distinct visual language from the admin dashboard — see
`admin-design.md` for that system. **Do not mix the two**: no slate/gray admin
surfaces on public pages, no dark burgundy/gold surfaces in admin.

Design direction: warm, spiritual, premium natural-stone jewelry brand. Dark
burgundy/near-black sections alternate with warm ivory sections, unified by a
single gold accent color and thin gold hairline dividers. Mood words: mystical,
calm, premium, editorial — never playful, never neon, never corporate-SaaS.

---

## Brand Color Tokens

Defined once in `src/app/globals.css` under `@theme inline`, then used as raw
hex literals (`text-[#c4973a]`) throughout components rather than the token
name — match that pattern for consistency with the existing codebase.

```css
--color-brand-dark: #1c0a0a;        /* primary dark surface */
--color-brand-gold: #c4973a;        /* primary accent — CTAs, links, dividers */
--color-brand-gold-light: #d4aa55;  /* accent hover state */
--color-brand-burgundy: #8b3a2e;    /* secondary accent — sale/alert badges */
--color-brand-ivory: #fdf8f0;       /* primary light surface / light-section headings */
--color-brand-rose: #e8d5c4;        /* body text on dark surfaces */
--color-brand-text: #2c1810;        /* body text on light surfaces */
```

| Role | Value | Usage |
|------|-------|-------|
| Dark section background | `bg-[#1c0a0a]` | Hero, featured products, footer parent sections |
| Darkest surface | `bg-[#0f0505]` | Footer specifically (one shade darker than other dark sections) |
| Light section background | `bg-[#fdf8f0]` | Alternating content sections (Five Elements, forms, etc.) |
| Accent / brand gold | `#c4973a` | CTAs, active nav state, borders, headings on dark bg, icon accents |
| Accent hover | `#d4aa55` | Hover state for gold buttons/links |
| Secondary accent (burgundy) | `#8b3a2e` | Sale badges, required-field asterisks, alerts |
| Heading-on-dark text | `#fdf8f0` (ivory) | `<h1>`/`<h2>` on dark sections |
| Heading-on-light text | `#1c0a0a` (brand-dark) | `<h2>` on light sections |
| Body-on-dark text | `#e8d5c4` (rose) | Paragraphs on dark sections, often at `/50` or `/60` opacity |
| Body-on-light text | `#2c1810` (brand-text) | Paragraphs on light sections, often at `/60` opacity |
| Muted/meta text | `#e8d5c4/30`–`/40` or `#2c1810/30`–`/40` | Timestamps, disabled, fine print |
| Gold hairline divider | `bg-[#c4973a]` at 1–2px, often faded via gradient | Top/bottom accent lines on hero, section borders at `/10`–`/20` |

**Five Elements (Ngũ Hành) color set** — used for element badges/collections,
centralized in `src/lib/elementColors.ts`:

```ts
Kim (Metal):  #C4973A   Mộc (Wood):  #3A8B4A   Thủy (Water): #3A6B8B
Hỏa (Fire):   #8B3A2E   Thổ (Earth): #8B6A2E
```

---

## Typography

Two Google Fonts loaded in `src/app/layout.tsx`, exposed as CSS vars and always
applied via inline `style={{ fontFamily: "var(--font-serif)" }}` /
`var(--font-sans)` (not Tailwind font utility classes) — match this pattern.

| Font | Variable | Used for |
|------|----------|----------|
| **Cormorant** (serif) | `var(--font-serif)` | All headings (`h1`–`h3`), brand wordmark "Tuệ Thọ", large display numerals |
| **Nunito Sans** (sans) | `var(--font-sans)` | Everything else — body copy, nav links, labels, buttons, eyebrow text |

### Type scale

| Role | Class pattern |
|------|----------------|
| Hero H1 | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight`, serif |
| Section H2 | `text-3xl sm:text-4xl md:text-5xl font-semibold`, serif |
| Card / subsection H3 | `text-xl sm:text-2xl font-semibold`, serif |
| Eyebrow label (above headings) | `text-xs sm:text-sm tracking-[0.4em] uppercase font-medium`, sans, gold |
| Body / lead paragraph | `text-base sm:text-lg leading-relaxed`, sans |
| Nav link / button label | `text-sm font-medium tracking-widest uppercase`, sans |
| Form label | `text-xs tracking-widest uppercase font-semibold`, sans, gold |
| Meta / fine print | `text-xs` or `text-sm`, sans, at reduced opacity |

**Signature detail:** headings frequently italicize one emphasized word/phrase
inline in gold: `<span className="text-[#c4973a] italic">Thiên Nhiên</span>`.
Use this for the single most evocative word in a headline — not more than one
per heading.

**Letter-spacing is load-bearing to the brand feel:** eyebrows, nav links,
buttons, and badges all use `tracking-widest` or `tracking-[0.4em]` uppercase
sans-serif. Never leave these at normal tracking — it reads as generic
otherwise.

---

## Layout Patterns

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for all section content.
- **Section vertical rhythm:** `py-20` for full sections; heading block gets
  `mb-14` before content grid.
- **Section alternation:** dark (`#1c0a0a`) and light (`#fdf8f0`) sections
  alternate down the page to create rhythm — never stack two dark or two light
  sections back-to-back without a divider.
- **Hero pattern** (see `HeroSection.tsx`): `min-h-screen` with a full-bleed
  `<Image fill>` background, a dark gradient overlay
  (`bg-gradient-to-b from-[#1c0a0a]/80 via-[#1c0a0a]/60 to-[#1c0a0a]/90`), a
  1px gold shimmer hairline at both the very top and very bottom of the
  section (`bg-gradient-to-r from-transparent via-[#c4973a] to-transparent`),
  and centered content: eyebrow → H1 (with italic gold emphasis) → subtext →
  two CTAs (filled + outline) → scroll hint with `animate-bounce`.
- **Grid patterns:**
  - Product cards: `grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6`
  - Five Elements / collection cards: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4`
  - Footer columns: `grid grid-cols-2 lg:grid-cols-4 gap-10`, brand column
    spans `col-span-2 lg:col-span-1`

---

## Component Patterns

### Buttons

| Variant | Class |
|---------|-------|
| Primary (filled gold) | `px-8 py-3.5 bg-[#c4973a] hover:bg-[#d4aa55] text-[#1c0a0a] text-sm font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer` |
| Secondary (outline gold) | `px-8 py-3.5 border border-[#c4973a] text-[#c4973a] hover:bg-[#c4973a]/10 text-sm font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer` |
| Outline → fill on hover (used for "view all" CTAs) | `border border-[#c4973a] text-[#c4973a] hover:bg-[#c4973a] hover:text-[#1c0a0a] ...` |

All buttons: **square corners, no `rounded-*`** — this is deliberate and
consistent across the entire public site (contrast with admin's `rounded-lg`
buttons). Buttons are always uppercase with wide tracking, never sentence case.

### Cards (product / collection)

- No visible border or shadow by default — separation comes from the image
  itself plus a subtle `bg-[#2c1810]/30` wrapper on dark sections.
- Image container: `relative aspect-square overflow-hidden` (products) or
  `aspect-[3/4]` (collection/element cards).
- Hover state on the whole card (`group`):
  - Image: `transition-transform duration-500 group-hover:scale-105` (slow zoom)
  - Dark tint overlay fades in: `bg-[#1c0a0a]/0 group-hover:bg-[#1c0a0a]/30 transition-colors duration-300`
  - A slide-up action bar (e.g. "Thêm Vào Giỏ") using
    `translate-y-full group-hover:translate-y-0 transition-transform duration-300`
  - Or a gold border reveal: `border-2 border-transparent group-hover:border-[#c4973a] transition-colors duration-300`

### Badges (product status: Bán Chạy / Mới / Sale / Combo)

Solid-fill rectangular badges (not pills — no `rounded-full`), positioned
`absolute top-3 left-3`, one hardcoded color per badge type in a
`Record<string, string>` map:

```ts
"Bán Chạy": "bg-[#8b3a2e] text-white"
"Mới":      "bg-[#1c0a0a] text-[#c4973a]"
"Sale":     "bg-[#c4973a] text-[#1c0a0a]"
"Nổi Bật":  "bg-[#8b3a2e] text-white"
"Combo":    "bg-[#2c1810] text-[#c4973a]"
```

### Form inputs

Public forms use a **different accent treatment than admin** — no focus ring,
just a border color change:

```
bg-white border border-[#c4973a]/25 text-[#2c1810] text-sm px-4 py-3
placeholder:text-[#2c1810]/30 focus:outline-none focus:border-[#c4973a]
transition-colors duration-200
```

Square corners (no `rounded-*`), label always
`text-[#c4973a] text-xs tracking-widest uppercase font-semibold`, required
marker is `<span className="text-[#8b3a2e]">*</span>`.

### Navbar

- `fixed top-0`, transparent over the hero, transitions to
  `bg-[#1c0a0a]/75 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-[#c4973a]/10`
  after `window.scrollY > 20`.
- Nav links: rose `#e8d5c4`, gold `#c4973a` on active/hover, uppercase wide-tracking sans.
- Mobile menu: full-height slide-in panel from the right (`w-72`,
  `translate-x-full` → `translate-x-0`), `bg-[#1c0a0a]` with gold hairline
  borders between items, plus a `bg-black/60 backdrop-blur-sm` scrim.

### Footer

Darkest surface in the palette (`bg-[#0f0505]`), 4-column grid (brand + quick
links + policies + contact), gold `/10`–`/30` opacity hairlines as separators,
all link text at `#e8d5c4/50` fading further to `/20`–`/30` for copyright line.

---

## Imagery Treatment

- Always `next/image` with `fill` inside a `relative` sized wrapper — never
  fixed width/height on the `<img>` itself.
- Standard aspect ratios: `aspect-square` for product grid tiles,
  `aspect-[3/4]` for editorial/collection cards, full-bleed `fill` with
  `object-cover object-center` for heroes.
- Every image sits under a color overlay/gradient tied to brand or element
  color — never a bare, untreated photo. Pattern:
  `linear-gradient(to top, {elementColor}55 0%, rgba(28,10,10,0.2) 50%, transparent 100%)`.
- Hover = slow zoom (`duration-500 group-hover:scale-105`), never a fast/snappy
  scale — the brand motion language is unhurried.
- Source and licensing rules for photos are in `images.md` — **do not
  duplicate that content here; it still governs where images come from.**

---

## Iconography

- Inline hand-drawn SVGs (Heroicons-style outline), `stroke="currentColor"`,
  `strokeWidth={1.5}`, `strokeLinecap="round" strokeLinejoin="round"` —
  no icon library import for public pages.
- Standard sizes: `w-4 h-4` inline with text, `w-5 h-5`–`w-6 h-6` for
  nav/action icons, `w-9 h-9` for the logo mark and social icon circles.
- Social icons sit in a bordered circle:
  `w-9 h-9 rounded-full border border-[#c4973a]/30 text-[#c4973a]/60 hover:text-[#c4973a] hover:border-[#c4973a]`.
- The brand mark itself is a custom circular SVG (earth mound + wave + sun) —
  reused identically in navbar and footer, gold ring + `#8B6A2E` fill.

---

## Motion Conventions

| Interaction | Duration / easing |
|---|---|
| Color/border/opacity transitions (links, buttons, borders) | `transition-colors duration-200` |
| Image zoom on card hover | `transition-transform duration-500` |
| Overlay fade-in on card hover | `transition-colors duration-300` |
| Slide-up action bar / slide-in mobile panel | `transition-transform duration-300 ease-in-out` |
| Sticky navbar background appear | `transition-all duration-300` |
| Scroll-hint affordance | `animate-bounce` |

General rule: **short/snappy (200ms) for color and interactive state, slower
(300–500ms) for spatial movement** (zoom, slide, translate). Never instant
(`duration-0`) transitions on hover states.

---

## Reference implementations

| File | What it shows |
|------|---------------|
| `src/app/globals.css` | Brand color tokens under `@theme inline` |
| `src/app/layout.tsx` | Font loading (Cormorant + Nunito Sans) |
| `src/components/public/HeroSection.tsx` | Full hero pattern: overlay, gold hairlines, italic emphasis, dual CTA |
| `src/components/public/Navbar.tsx` | Scroll-aware transparent→solid nav, mobile slide-in panel |
| `src/components/public/Footer.tsx` | Darkest-surface footer, 4-column layout, hairline dividers |
| `src/components/public/FeaturedProducts.tsx` | Product card hover system, badge color map |
| `src/components/public/FiveElements.tsx` | Element-colored image gradient overlays, icon badge pattern |
| `src/components/public/contact/ContactForm.tsx` | Public form input styling (contrast with admin's focus-ring inputs) |
| `src/lib/elementColors.ts` | Centralized Ngũ Hành (Five Elements) color palette |
