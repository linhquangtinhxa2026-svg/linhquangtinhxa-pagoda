# Image Rules

All images used across public pages must be free-license photos sourced from Unsplash,
**except** for photos of the actual Linh Quang pagoda itself (building, gate, grounds,
real events) — those may be sourced from the pagoda's own official channels (see
"Real pagoda source links" below) since they depict the real subject, not stock content.
**Always download images locally — never use external Unsplash URLs directly in components.**
Reasons: better SEO (Next.js can embed metadata), faster load (no external CDN round-trip), no broken images if Unsplash changes URLs.
Never use images directly from competitor or reference sites.

## Real pagoda source links

For real photos/videos of the actual pagoda (architecture, grounds, events — not
identifiable individual portraits), check these official sources first:
- Facebook page: https://www.facebook.com/LinhQuangTinhXa
- Google (Maps/Photos) share link: https://share.google/zQmBTM8wPFHmA8rLw

**How to extract a real image file (Facebook blocks reading `<img src>` via JS for
privacy reasons):**
1. Open the target photo in the Facebook lightbox (click the thumbnail).
2. Use `read_network_requests` (Chrome MCP tool) filtered on `scontent` or `t39.30808`
   to capture the real `scontent.*.fbcdn.net` CDN URL — reading `img.src` directly via
   `javascript_tool` returns `[BLOCKED: Cookie/query string data]`, so this network-log
   approach is the reliable path.
3. `curl -sL "<captured CDN URL>" -o public/images/<page>/<name>.jpg` to download it
   locally, then verify with the Read tool before using it.

**Never** use a real photo containing identifiable individual monks/masters and label
it with a fabricated name or biography — that misattributes a real person's likeness.
For any named-individual "master" profile content that isn't independently verified,
use a generic (non-identifying) Unsplash monk/robe photo as a placeholder instead, and
flag to the user that it's a stock placeholder pending a real photo.

---

## Workflow for finding images

### Step 1 — Understand the product context
Check the reference site (https://tinhlamjw.com/shop/) or ask the user to understand:
- What type of products are shown (e.g. natural gemstone bead bracelets, citrine, rose quartz, etc.)
- The visual style and mood (mystical, warm, minimal, dark, etc.)

### Step 2 — Search Unsplash for candidates
Use WebFetch on Unsplash search pages to get photo IDs:
```
https://unsplash.com/s/photos/[search-term]
```
Good search terms for this brand:
- `natural-stone-bracelet`
- `crystal-bracelet`
- `gemstone-bracelet`
- `healing-crystal-bracelet`
- `feng-shui-bracelet`

Extract photo slugs from the results (e.g. `qiDR6G2SiTg`, `XNW_xqga4V4`).

### Step 3 — Verify each candidate
Fetch the individual photo page to confirm what it actually shows:
```
https://unsplash.com/photos/[slug]
```
Ask: orientation, colors, materials, mood, and whether it suits the placement (hero, portrait, card, etc.).

### Step 4 — Get the real image URL
Fetch the photo page and extract the `images.unsplash.com` URL from the `og:image` or page source.
The real numeric photo ID looks like: `photo-1768569446356-e1c0013cc733`

Construct the download URL with appropriate dimensions:
```
https://images.unsplash.com/photo-XXXXXXXXXXXX-XXXXXXXXXXXX?w=1800&h=900&fit=crop&q=85
```

### Step 5 — Download and save locally

Save to `public/images/[page]/[descriptive-name].jpg`. Use curl:
```bash
curl -L "https://images.unsplash.com/photo-XXX?w=1800&h=900&fit=crop&q=85" \
  -o public/images/[page]/[name].jpg
```

Folder convention:
```
public/images/
├── home/       # Homepage sections
├── about/      # About Us page
├── products/   # Product pages
├── blog/       # Blog post images
└── common/     # Shared across pages
```

### Step 6 — Use local path in component

```tsx
// ✅ Always use local path
<Image src="/images/about/hero-bg.jpg" ... />

// ❌ Never use external Unsplash URL
<Image src="https://images.unsplash.com/photo-..." ... />
```

### Step 7 — Match dimensions to placement

| Placement | Download dimensions | Local path pattern |
|-----------|--------------------|--------------------|
| Full-width hero background | `w=1800&h=900` | `images/[page]/hero-bg.jpg` |
| Portrait editorial (About, Team) | `w=700&h=900` | `images/[page]/[section].jpg` |
| Square product card | `w=600&h=600` | `images/products/[name].jpg` |
| Wide card / feature section | `w=900&h=600` | `images/[page]/[section].jpg` |

---

## Image content guidelines for this brand

Always choose images that show:
- ✅ Natural round gemstone/crystal bead bracelets
- ✅ Stones like citrine, rose quartz, amethyst, clear quartz, moonstone, garnet
- ✅ Warm, mystical, or minimal backgrounds (wood, stone, fabric, dark surfaces)
- ✅ Mood that feels spiritual, calm, and premium

Avoid:
- ❌ Western diamond/gold fine jewelry
- ❌ Fashion accessories that look synthetic or plastic
- ❌ Generic stock photos unrelated to natural stones
- ❌ Images already used on competitor sites
