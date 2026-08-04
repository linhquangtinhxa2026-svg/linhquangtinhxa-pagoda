# State management

- Only use Zustand for state every page needs immediately without an API call (user session, global UI flags)
- Never put server data in Zustand — that belongs in React Query
- Always define stores in `src/stores/[feature].ts`
- Always type the store interface explicitly — no implicit `any`
- Never mutate state directly — always use `set()`
- Always use `useShallow` when selecting multiple fields from a store to avoid unnecessary re-renders
- Wrap common store access in a dedicated hook in `src/hooks/` (e.g. `useAuth.ts` wraps `useAuthStore`)

## Decision guide
```
Is this data from an API?
  YES → React Query (useQuery / useMutation)
  NO  → Does every page need it immediately without an API call?
    YES → Zustand
    NO  → Does it need to survive page refresh?
      YES → localStorage + useState
      NO  → useState
```
