---
name: naming-conventions
description: Naming conventions for files, folders, components, hooks, services, constants, and variables in the manage-expense project.
---

# Naming Conventions

---

## Files

| File type | Convention | Examples |
|---|---|---|
| React components | PascalCase + `.tsx` | `TransactionTable.tsx`, `AddBudgetModal.tsx`, `CategoryItem.tsx` |
| Hooks | camelCase + `.ts` | `useTransactionsData.ts`, `useDebouncedCallback.ts` |
| Services | camelCase + `.ts` | `transactions.ts`, `budgets.ts`, `categories.ts` |
| Stores | `use` + Name + `Store` + `.ts` | `useUserPreferencesStore.ts`, `useBudgetStore.ts` |
| Schemas | camelCase + `.ts` | `transaction.ts`, `budget.ts` |
| Utils / lib / config | camelCase + `.ts` | `formatters.ts`, `chartHelpers.ts`, `pocketbase.ts` |
| Constants | camelCase + `.ts` | `api.ts`, `routes.ts` |

## Folders

- **Single-word:** lowercase — `hooks/`, `services/`, `components/`, `stores/`
- **Multi-word:** kebab-case — `savings-goals/`, `dashboard/`, `drop-and-collect/`

---

## Code

### Components
PascalCase for component names and their files.
```tsx
export function TransactionTable({ ... }: TransactionTableProps) { ... }
export default function AddBudgetModal({ ... }: AddBudgetModalProps) { ... }
```

### Hooks
`use` prefix, camelCase.
```ts
export function useTransactionsData() { ... }
export function useDebouncedCallback<T>(fn: T, delay?: number): T { ... }
```

### Service functions
`verb + Entity + Service` suffix, camelCase.
```ts
export const getTransactionsService = async (userId: string) => { ... }
export const createBudgetService = async (data: Partial<Budget>) => { ... }
export const updateCategoryService = async (id: string, data: Partial<Category>) => { ... }
export const deleteLoanService = async (id: string) => { ... }
```

Common verbs: `get`, `create`, `update`, `delete`.

### Constants
UPPER_SNAKE_CASE for all constant values.
```ts
export const COLLECTIONS = {
  TRANSACTIONS: 'transactions',
  BUDGETS: 'budgets',
} as const

export const ROUTES = {
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/dashboard/transactions',
} as const
```

### Zustand stores
`use + Name + Store`, exported as a named const.
```ts
export const useUserPreferencesStore = create<PreferencesState>()(persist(...))
export const useBudgetStore = create<BudgetState>()((set) => ({ ... }))
```

Store setter methods: `set + Entity` camelCase — `setPreferences`, `setCurrency`, `setLanguage`.

### React Query keys
Kebab-case string as first element, optional filters object as second.
```ts
queryKey: ['transactions']
queryKey: ['budgets', { userId }]
queryKey: ['categories', filters]
```

### TypeScript types & interfaces
PascalCase. Infer from Zod schemas instead of writing manually.
```ts
// ✅ Inferred from schema — stays in sync automatically
export type TransactionFormData = z.infer<typeof transactionSchema>

// ✅ Shared domain type
export interface Budget {
  id: string
  name: string
  amount: number
  user_id: string
}
```

### Variables and state
camelCase. Booleans use `is` or `has` prefix.
```ts
const [isOpen, setIsOpen] = useState(false)
const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
const isLoading = isPending
const hasPermission = user?.verified
```

### Event handlers
- `on` prefix for props/callbacks passed to children: `onEdit`, `onClose`, `onSuccess`, `onChange`
- `handle` prefix for internal handlers: `handleFilterChange`, `handleSubmit`, `handleDelete`
```ts
const onEdit = (item: Transaction) => { ... }
const handleFilterChange = (updated: Filters) => { ... }
```

---

## Import Order

1. React and third-party packages
2. Internal `@/` imports (constants → lib → stores → services → hooks → components)
3. Relative local imports (`./`)

```ts
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { COLLECTIONS } from '@/constants/api'
import { transactionSchema, type TransactionFormData } from '@/lib/dashboard/schemas/transaction'
import { useUserPreferencesStore } from '@/stores/dashboard/useUserPreferencesStore'
import { createTransactionService } from '@/services/transactions'
import { useCreateTransaction } from '@/hooks/dashboard/useTransactionsData'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import TransactionTable from './TransactionTable'
```
