# Translation Rules

This project supports **English** (`src/locales/en/translation.json`), **Vietnamese** (`src/locales/vi/translation.json`), and **Simplified Chinese** (`src/locales/zh/translation.json`). All three files must always be in sync.

---

## Rule: Always update both locale files when adding UI text

Whenever you add or modify any user-visible text in a component, you **must**:

1. Add the key to `src/locales/en/translation.json`
2. Add the translated key to `src/locales/vi/translation.json`
3. Use `t('section.key')` in the component — **never** hardcode display strings

Do this in the same commit/change as the component work. Never leave a `t('some.key', 'Fallback string')` as a permanent solution — the fallback is only acceptable during development before the key is added.

---

## Key naming convention

Keys are nested by feature section, using camelCase:

```json
"analytics": {
  "spendingOverview": "Spending Overview",
  "thisWeek": "This Week"
}
```

Match the section to the page/feature:
- `dashboard.*` — main dashboard page
- `analytics.*` — analytics page
- `transactions.*` — transactions page
- `budgets.*` — budgets page
- `categories.*` — categories page
- `settings.*` — settings page
- `common.*` — shared across multiple pages (confirm buttons, error states, etc.)
- `forms.*` — reusable form field labels
- `sidebar.*`, `topnav.*` — navigation

---

## Dynamic values: use interpolation

For strings with dynamic values, use i18next interpolation — **not** template literals:

```tsx
// ✅ Correct
t('analytics.weeksThisYear', { count: weeklyData.length })
// translation file: "weeksThisYear": "{{count}} weeks this year"

// ❌ Wrong — bypasses the translation system
t('analytics.weeksThisYear', `${weeklyData.length} weeks this year`)
```

---

## Rule: Never use `t()` output as a React `key`

Translated strings must **never** be used as React `key` props. Different translation keys can produce the same string in some languages (e.g. Vietnamese), causing the duplicate-key warning and broken rendering.

**❌ DON'T:**
```tsx
const cards = [
  { label: t('goals.totalGoals', 'Total Goals'), value: '3' },
  { label: t('goals.totalSaved', 'Total Saved'), value: '$500' },
]
cards.map(card => <div key={card.label}>...</div>)
```

**✅ DO — add a stable `key` field:**
```tsx
const cards = [
  { key: 'totalGoals', label: t('goals.totalGoals', 'Total Goals'), value: '3' },
  { key: 'totalSaved', label: t('goals.totalSaved', 'Total Saved'), value: '$500' },
]
cards.map(card => <div key={card.key}>...</div>)
```

Use the translation key name (e.g. `'totalGoals'`), an index, or any other value that is **stable and unique across languages**.

---

## Checklist before completing any UI task

- [ ] Every `t('...')` call has a matching key in **both** locale files
- [ ] No hardcoded English strings in JSX (buttons, labels, placeholders, tooltips, error messages)
- [ ] Vietnamese translation is natural — not a literal word-for-word translation
- [ ] Dynamic strings use `{{variable}}` interpolation, not JS template literals
- [ ] `t()` output is **never** used as a React `key` prop
