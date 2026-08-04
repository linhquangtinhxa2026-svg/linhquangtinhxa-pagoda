# Session Checklist

After every coding session (any time you finish a batch of changes), run:

```bash
npx tsc --noEmit
npx eslint src --max-warnings=0
```

Report the output. If there are errors or warnings, fix them before closing out. Do this without being asked.

---

## ESLint patterns to watch for

### 1. `react-hooks/exhaustive-deps` — missing or wrong deps
Never put a function from `useAuth()` / `useShallow` in a `useEffect` deps array — calling it inside the effect changes Zustand state, which changes the function reference, which causes an infinite loop.

**Wrong:**
```ts
const { setUser } = useAuth()
useEffect(() => { setUser(...) }, [setUser]) // infinite loop
```

**Right:** call store actions via `useAuthStore.getState().setUser(...)` inside effects — they are stable and don't belong in the deps array.

### 2. React Compiler rule — `setState` inside `useEffect`
`eslint-config-next` includes the React Compiler plugin, which flags any `setState` called directly in an effect body as a cascading render risk.

**Wrong:**
```ts
useEffect(() => {
  setChecking(false) // flagged
}, [])
```

**Right:** derive the value from an external store subscription using `useSyncExternalStore`, or restructure so the effect only handles side effects (redirect, API calls) and no `setState`.

```ts
const isValid = useSyncExternalStore(
  (cb) => pb.authStore.onChange(() => cb()),
  () => pb.authStore.isValid,
  () => false
)
// No setState in the effect — isValid drives rendering directly
```

### 3. Unused imports
After editing files, remove any import that became unused. TypeScript and ESLint both flag these.

---

## Quick reference commands

```bash
# Type check only
npx tsc --noEmit

# ESLint on specific folder
npx eslint src/app/admin --max-warnings=0

# Both at once
npx tsc --noEmit && npx eslint src --max-warnings=0
```
