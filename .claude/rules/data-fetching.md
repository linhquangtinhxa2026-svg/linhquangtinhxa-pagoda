# Data fetching

- Never use `useEffect` for data fetching — always use `useQuery` or `useMutation`
- Always define query keys as kebab-case string arrays (`['product-list', filters]`)
- Always export hooks from `features/[domain]/hooks.ts` — one hook per query or mutation
- Always use `keepPreviousData` (via `placeholderData: keepPreviousData`) on paginated/filtered queries
- Always use `enabled: !!id` pattern to guard queries that depend on an optional param
- Always invalidate related query keys in `onSuccess` of mutations
- Always surface `isLoading`, `isFetching`, and `error` from hooks — never swallow them silently
- Mutation hooks accept optional `{ onSuccess, onError }` callbacks — never hardcode toast/navigation inside the hook
- Services in `src/services/` are dumb wrappers — no logic, no error handling, just call Axios and return data
- Query client config lives in `src/lib/query-client.ts` — default `staleTime: 1000 * 60`, `retry: false`
