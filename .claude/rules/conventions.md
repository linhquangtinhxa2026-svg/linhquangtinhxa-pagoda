# Project conventions

- Keep `page.tsx` thin — import and render a container component from `features/`
- Default to Server Components in `app/` — add `'use client'` only when needed (hooks, interactivity)
- All feature containers go in `src/features/[domain]/components/`
- Domain folders use kebab-case (`gold-rings/`, `auth/`)
- Shared types used across features go in `src/types/` — feature-specific types stay in `features/[domain]/types.ts`
- Never put business logic in `page.tsx` — it belongs in feature containers or hooks
- Always define API endpoint strings in `src/constants/api.ts` — never hardcode URLs in services
- Always define route paths in `src/constants/routes.ts` — never hardcode paths in components
- Use route groups `(auth)/` and `(public)/` to separate protected and public pages
- All providers go in `src/lib/providers.tsx` and are imported once in `src/app/layout.tsx`
