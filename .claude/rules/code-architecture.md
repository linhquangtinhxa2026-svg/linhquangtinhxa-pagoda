---
description: Code Architecture Rules — Service Layer, Constants, Schemas, Hooks, Zustand
---

# Code Architecture Rules

These rules define the mandatory coding patterns for this project. They apply whenever you write or modify any TypeScript/TSX file in `src/`.

---

## Layer Responsibility Matrix

| Layer | Location | Owns | Never Does |
|-------|----------|------|------------|
| **Constants** | `src/constants/` | String literals (collection names, routes) | Logic |
| **Services** | `src/services/` | Raw `pb` calls, returns typed data | UI, state, mapping |
| **Shared Hooks** | `src/hooks/dashboard/` | Cross-feature React Query wrappers, `mapRecord` | Direct `pb` calls |
| **Feature Hooks** | `src/components/dashboard/<feature>/use<Feature>.ts` | Feature-specific mutations, debounce, toast | Direct `pb` calls |
| **Components** | `src/components/` | UI rendering, form submission via hooks | Direct `pb` calls |
| **Pages** | `src/app/dashboard/` | Route entry only (`page.tsx` = 4 lines) | Business logic, `pb` calls |
| **Stores** | `src/stores/` | Global UI state (preferences, auth) | Server data |
| **Schemas** | `src/lib/dashboard/schemas/` | Zod validation + inferred types | Logic |

---

## Rule 1: Constants — No Raw String Literals

Always use `COLLECTIONS.*` and `ROUTES.*` constants. Never hardcode collection names or route paths as raw strings.

```ts
// src/constants/api.ts
export const COLLECTIONS = {
  TRANSACTIONS: 'transactions',
  BUDGETS: 'budgets',
  CATEGORIES: 'categories',
  LOANS: 'loans',
  ASSETS: 'assets',
  USER_PREFERENCES: 'user_preferences',
  IMPORT_BATCHES: 'import_batches',
} as const

// src/constants/routes.ts
export const ROUTES = {
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/dashboard/transactions',
  BUDGETS: '/dashboard/budgets',
  CATEGORIES: '/dashboard/categories',
  SETTINGS: '/dashboard/settings',
} as const
```

**✅ DO:**
```ts
import { COLLECTIONS } from '@/constants/api'
pb.collection(COLLECTIONS.TRANSACTIONS).getFullList(...)
```

**❌ DON'T:**
```ts
pb.collection('transactions').getFullList(...)
```

---

## Rule 2: Service Layer — Only Services Call `pb`

All PocketBase operations live in `src/services/<domain>.ts`. Functions are thin, typed, async wrappers — no logic, no mapping, no React.

Only `src/services/*.ts` and `src/stores/dashboard/useUserPreferencesStore.ts` (fire-and-forget sync) may import `pb`.

```ts
// src/services/transactions.ts
import pb from '@/lib/pocketbase'
import { COLLECTIONS } from '@/constants/api'
import type { Transaction } from '@/types/pocketbase-types'

export const getApprovedTransactionsService = async (): Promise<Transaction[]> => {
  return pb.collection(COLLECTIONS.TRANSACTIONS).getFullList<Transaction>({
    filter: 'status = "approved"',
    sort: '-date',
    requestKey: null,
  })
}

export const createTransactionService = async (data: Partial<Transaction>): Promise<Transaction> => {
  return pb.collection(COLLECTIONS.TRANSACTIONS).create<Transaction>(data)
}

export const updateTransactionService = async (id: string, data: Partial<Transaction>): Promise<Transaction> => {
  return pb.collection(COLLECTIONS.TRANSACTIONS).update<Transaction>(id, data)
}

export const deleteTransactionService = async (id: string): Promise<void> => {
  await pb.collection(COLLECTIONS.TRANSACTIONS).delete(id)
}
```

**Naming convention:** `verb + Entity + Service`
- `getTransactionsService`, `createTransactionService`, `updateBudgetService`, `deleteCategoryService`

**✅ DO:**
```ts
// In a hook or component
import { deleteTransactionService } from '@/services/transactions'
await deleteTransactionService(id)
```

**❌ DON'T:**
```ts
// In a hook or component — never import pb directly
import pb from '@/lib/pocketbase'
await pb.collection('transactions').delete(id)
```

---

## Rule 3: Hooks — React Query Wrappers

Hooks in `src/hooks/dashboard/` wrap services with React Query. The `mapRecord` transform (raw PB record → domain type) belongs here, not in services.

```ts
// src/hooks/dashboard/useTransactionsData.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getApprovedTransactionsService,
  createTransactionService,
  deleteTransactionService,
} from '@/services/transactions'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import type { Transaction } from '@/types/pocketbase-types'

// ─── Query ───────────────────────────────────────────────────────────────────

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: getApprovedTransactionsService,
  })
}

// ─── Mutations ───────────────────────────────────────────────────────────────

interface MutationOptions {
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export function useDeleteTransaction({ onSuccess, onError }: MutationOptions = {}) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteTransactionService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      onSuccess?.()
    },
    onError,
  })

  const doDelete = useDebouncedCallback(mutate)

  return { doDelete, isLoading: isPending }
}
```

**Query key convention:** kebab-case string array — `['transactions']`, `['budgets', filters]`, `['categories']`

---

## Rule 4: Zustand — Always `useShallow` for Multiple Fields

When a component or hook destructures two or more fields from a Zustand store, wrap the selector with `useShallow` to prevent unnecessary re-renders.

```ts
import { useShallow } from 'zustand/react/shallow'
import { useUserPreferencesStore } from '@/stores/dashboard/useUserPreferencesStore'

// ✅ Correct — useShallow prevents re-render when unrelated fields change
const { preferences, setCurrency } = useUserPreferencesStore(
  useShallow((state) => ({
    preferences: state.preferences,
    setCurrency: state.setCurrency,
  }))
)

// ✅ Also fine — single field selector needs no useShallow
const preferences = useUserPreferencesStore((state) => state.preferences)
```

**❌ DON'T (causes unnecessary re-renders):**
```ts
const { preferences, setCurrency, setLanguage } = useUserPreferencesStore()
```

**Rule of thumb:** `useShallow` is required whenever you destructure ≥2 fields.

---

## Rule 5: `useDebouncedCallback` — Wrap All Mutation Calls

All form submission handlers and delete/action handlers must be wrapped with `useDebouncedCallback` to prevent duplicate network requests from rapid clicks.

Place the hook in `src/hooks/useDebouncedCallback.ts`. It fires immediately (leading-edge) and blocks re-fires within the delay window.

```ts
// src/hooks/useDebouncedCallback.ts
import { useCallback, useRef } from 'react'

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  fn: T,
  delay = 500
): T {
  const lastCall = useRef(0)

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastCall.current >= delay) {
        lastCall.current = now
        return fn(...args)
      }
    },
    [fn, delay]
  ) as T
}
```

**Usage pattern in hooks:**
```ts
const { mutate, isPending } = useMutation({ mutationFn: createTransactionService })
const doCreate = useDebouncedCallback(mutate)
return { doCreate, isLoading: isPending }
```

**Usage pattern directly in a component (for delete buttons):**
```ts
const handleDelete = useDebouncedCallback(async (id: string) => {
  await deleteTransactionService(id)
  queryClient.invalidateQueries({ queryKey: ['transactions'] })
})
```

---

## Rule 6: Zod Schemas — Per-Domain Files, Types Inferred

Zod schemas live in `src/lib/dashboard/schemas/<domain>.ts`. Types are always inferred from the schema — never write a separate matching interface.

```ts
// src/lib/dashboard/schemas/transaction.ts
import { z } from 'zod'

export const transactionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['income', 'expense']),
  category_id: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
})

// Type is inferred — no manual interface needed
export type TransactionFormData = z.infer<typeof transactionSchema>
```

```ts
// src/lib/dashboard/schemas/index.ts — barrel re-export
export * from './transaction'
export * from './budget'
export * from './category'
```

**✅ DO:**
```ts
import { transactionSchema, type TransactionFormData } from '@/lib/dashboard/schemas/transaction'
```

**❌ DON'T (inline schema in a component):**
```tsx
// Inside TransactionModal.tsx — never do this
const schema = z.object({ amount: z.number(), ... })
```

**❌ DON'T (duplicate manual type):**
```ts
export const transactionSchema = z.object({ amount: z.number() })
export interface TransactionFormData { amount: number }  // ← redundant
```

---

## Rule 7: Form Fields — Controller-Based Components

Reusable form field components live in `src/components/form/`. They accept `control`, `name`, `label`, and `error` props and handle label, error display, and React Hook Form wiring internally. Never duplicate input+label+error blocks across modals.

```tsx
// src/components/form/CurrencyInput.tsx
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

interface CurrencyInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  error?: string
  disabled?: boolean
}

export function CurrencyInput<T extends FieldValues>({
  control, name, label, error, disabled,
}: CurrencyInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{label}</label>
          <input
            type="text"
            value={field.value ? Number(field.value).toLocaleString() : ''}
            onChange={(e) => {
              const numeric = parseFloat(e.target.value.replace(/,/g, ''))
              field.onChange(isNaN(numeric) ? '' : numeric)
            }}
            disabled={disabled}
            className="rounded-md border px-3 py-2 text-sm"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      )}
    />
  )
}
```

---

## Rule 8: Feature-Sliced Design — Co-locate Feature Hooks

Each dashboard feature owns a co-located hook file for its mutations. This is the Feature-Sliced Design (FSD) pattern: everything a feature needs lives together in its folder.

**Feature folder structure:**
```
src/components/dashboard/<feature>/
├── <Feature>Container.tsx   ← orchestrator: calls hooks, owns UI state
├── <Feature>Card.tsx        ← presentational
├── <Feature>SummaryCards.tsx ← presentational
├── Delete<Feature>Dialog.tsx ← presentational
└── use<Feature>.ts          ← feature mutations, debounce, toast
```

**The co-located hook owns:** `useMutation`, `useDebouncedCallback`, service imports, `toast` calls, `queryClient.invalidateQueries`

**The container never calls `useMutation` directly** — it imports from the co-located hook:

```ts
// ✅ src/components/dashboard/budgets/useBudgets.ts
export function useDeleteBudget(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteBudgetService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] })
      options?.onSuccess?.()
      toast.success(t('budgets.deleteSuccess'))
    },
    onError: (error: any) => toast.error(error.message),
  })

  const doDelete = useDebouncedCallback(mutate)
  return { doDelete, isDeleting: isPending }
}

// ✅ src/components/dashboard/budgets/BudgetsContainer.tsx
const { doDelete, isDeleting } = useDeleteBudget({
  onSuccess: () => { setBudgetToDelete(null); setIsDeleteConfirmOpen(false) },
})
```

**Why NOT co-locate in `src/app/dashboard/<feature>/`:**
`src/app/` is the Next.js file-system router. Only routing files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) belong there. Component and hook files go in `src/components/dashboard/<feature>/`. The `page.tsx` is just a 4-line entry point that hands off to the container immediately.

**Shared vs feature hooks:**
- Use `src/hooks/dashboard/` for hooks shared across multiple features (e.g. `useDashboardData`, `useFormatCurrency`)
- Use the co-located `use<Feature>.ts` for feature-specific mutations

---

## Quick Reference

| Question | Answer |
|----------|--------|
| Where do `pb.collection()` calls go? | `src/services/<domain>.ts` only |
| Where do shared React Query hooks go? | `src/hooks/dashboard/use<Domain>Data.ts` |
| Where do feature-specific mutations go? | `src/components/dashboard/<feature>/use<Feature>.ts` |
| Where do Zod schemas go? | `src/lib/dashboard/schemas/<domain>.ts` |
| Where do reusable form fields go? | `src/components/form/` |
| Where do PB collection name strings go? | `src/constants/api.ts` → `COLLECTIONS.*` |
| Where do route path strings go? | `src/constants/routes.ts` → `ROUTES.*` |
| When is `useShallow` required? | Any Zustand selector that destructures ≥2 fields |
| When is `useDebouncedCallback` required? | Any `mutate` call in a form submit or action button |
| Can a component import `pb` directly? | No — only `src/services/*.ts` and `useUserPreferencesStore.ts` |
| Should `mapRecord` live in services? | No — domain mapping stays in hooks |
| Can components/hooks go in `src/app/`? | No — only `page.tsx`, `layout.tsx`, routing files |

---

## Adding a New Domain Feature — Checklist

1. Add collection name to `src/constants/api.ts` → `COLLECTIONS`
2. Add route path to `src/constants/routes.ts` → `ROUTES`
3. Create `src/services/<domain>.ts` with typed service functions
4. Create `src/lib/dashboard/schemas/<domain>.ts` with Zod schema + inferred type
5. Add export to `src/lib/dashboard/schemas/index.ts`
6. Create feature folder `src/components/dashboard/<feature>/`
7. Create `use<Feature>.ts` in the feature folder — mutations, debounce, toast
8. Build container + presentational components in the same feature folder
9. Keep `src/app/dashboard/<domain>/page.tsx` thin — just render the container (4 lines)

---

## Rule 9: Modals & Forms — Always Reuse Shared UI Patterns

When building any modal or form, check for and use these existing shared components before reaching for a plain HTML input:

| Need | Use | Never use |
|------|-----|-----------|
| Date field | `<DatePicker>` from `@/components/dashboard/DatePicker` | `<Input type="date">` |
| Currency / number field | `amountDisplay` state + `handleAmountChange` pattern (see `TransactionModal`) | `<Input type="number">` |
| Modal shell | Gradient header + scrollable `overflow-y-auto` body + sticky `DialogFooter` with border-top | Ad-hoc padding/layout |

### Comma-formatted amount input pattern (copy exactly)

```tsx
const [amountDisplay, setAmountDisplay] = useState<string>(
  currentAmount ? currentAmount.toLocaleString('en-US') : ''
)

const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value.replace(/,/g, '').replace(/[^0-9.]/g, '')
  const parts = raw.split('.')
  const sanitized = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : raw
  const numeric = parseFloat(sanitized)
  if (sanitized === '' || sanitized === '.') {
    setAmountDisplay(sanitized)
    setValue('field_name', 0, { shouldValidate: true })
  } else if (!isNaN(numeric)) {
    const [intPart, decPart] = sanitized.split('.')
    const formattedInt = parseInt(intPart || '0', 10).toLocaleString('en-US')
    const formatted = decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt
    setAmountDisplay(formatted)
    setValue('field_name', numeric, { shouldValidate: true })
  }
}
```

**Reference implementation:** `src/components/dashboard/forms/TransactionModal.tsx`
