---
name: project-conventions
description: Apply coding conventions for Buddha Jewelry including file naming, import style, component patterns, and stack-specific rules. Use whenever writing new components, functions, or files in this project.
---

# Project conventions — Buddha Jewelry

## Stack
Next.js 14+ App Router + TypeScript (strict). TanStack React Query v5 for server state, Zustand for client state, React Hook Form + Yup for forms, Axios for API calls. Tailwind CSS + shadcn/ui for UI.

## Project structure
```
src/
├── app/              # Routing only — thin page.tsx files
├── features/         # Domain modules (components, hooks, schemas, types)
├── services/         # Dumb Axios wrappers per domain
├── stores/           # Zustand global state
├── hooks/            # Cross-feature shared hooks
├── components/       # ui/, form/, common/
├── lib/              # axios.ts, query-client.ts, providers.tsx
├── constants/        # api.ts, routes.ts
├── types/            # Shared ApiResponse<T>, PaginatedResponse<T>
└── utils/            # Pure helpers
```

## File naming
- Files: kebab-case (`product-detail-modal.tsx`)
- Components: PascalCase (`ProductDetailModal`)
- Hooks/services/utils: camelCase (`useAuth.ts`, `products.ts`)

## Import style
- Always absolute imports from `@/`
- Never relative `../` imports across feature boundaries

## Naming conventions
- Service functions: `verb + Entity + Service` (`getProductListService`)
- Constants: `UPPER_SNAKE_CASE`
- Zustand stores: `use + Name + Store`
- React Query keys: kebab-case string arrays (`['product-list', filters]`)
- Booleans: `is/has` prefix; event props: `on` prefix; handlers: `handle` prefix

## UI
- Always use shadcn/ui components — never raw HTML for interactive UI elements
- Always use Tailwind for styling — no inline styles, no CSS modules

## Rules summary
- No `any` in TypeScript
- Named exports only
- `page.tsx` imports feature container — no logic in pages
- Server Components by default; `'use client'` only when needed
- Yup schema in `schemas.ts` — never inline validation
- Zustand only for non-API global state; use `useShallow` for multi-field selects
- React Query for all API data; never `useEffect` for fetching
- All Pocketbase API calls through Axios — auth token attached via interceptor
