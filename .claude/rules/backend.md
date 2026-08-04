---
paths:
  - "src/lib/**"
  - "src/services/**"
  - "src/stores/auth*"
  - "src/features/auth/**"
  - "src/app/api/**"
---

# Backend — Pocketbase

## Auth
- Use Pocketbase's built-in auth SDK (`pb.authStore`) for session state — never roll custom JWT handling
- Always read auth state from `pb.authStore.isValid` and `pb.authStore.model`
- Sync `pb.authStore` into Zustand on app load so components don't import `pb` directly
- Never expose the Pocketbase admin credentials on the client
- On 401 response, clear auth state and redirect to `/login`

## API calls
- All data operations go through plain Axios calls to the Pocketbase REST API
- Axios instance lives in `src/lib/axios.ts` — attach Bearer token from `pb.authStore.token` in the request interceptor
- All endpoint strings defined in `src/constants/api.ts` — never hardcode Pocketbase collection paths
- Always use typed queries — never leave response data untyped
- Always handle `isLoading` and `error` states in UI — never render data without a loading guard

## Pocketbase URL
- Base URL from `process.env.NEXT_PUBLIC_POCKETBASE_URL` — never hardcode
