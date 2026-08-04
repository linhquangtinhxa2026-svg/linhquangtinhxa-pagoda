---
name: backend
description: Apply backend conventions for Pocketbase in Buddha Jewelry. Use for any data fetching, auth, or database operations involving Pocketbase.
---

# Backend conventions — Pocketbase

## Service
Pocketbase REST API via Axios. Auth managed through Pocketbase's built-in auth SDK (`pb.authStore`).

## Auth
- Use `pb.authStore.isValid` to check session validity
- Use `pb.authStore.token` to get the Bearer token — attach it in the Axios request interceptor
- Sync `pb.authStore.model` into Zustand `useAuthStore` on app load
- Never check auth state directly in components — use `useAuth()` hook
- On 401, clear auth and redirect to `/login`
- Base URL from `process.env.NEXT_PUBLIC_POCKETBASE_URL`

## Data fetching
- All API calls go through the Axios instance in `src/lib/axios.ts`
- All collection endpoint strings defined in `src/constants/api.ts`
- Always use typed responses — define collection types in `features/[domain]/types.ts`
- Always handle `isLoading` and `error` states — never render data without guards

## Pocketbase REST patterns
- List: `GET /api/collections/{collection}/records`
- Get one: `GET /api/collections/{collection}/records/{id}`
- Create: `POST /api/collections/{collection}/records`
- Update: `PATCH /api/collections/{collection}/records/{id}`
- Delete: `DELETE /api/collections/{collection}/records/{id}`
- Auth login: `POST /api/collections/users/auth-with-password`
