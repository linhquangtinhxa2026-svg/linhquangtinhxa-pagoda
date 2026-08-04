# Blueprint Alignment: Optimizing manage-expense Codebase

## Context

The `.claude/nextjs-typescript-blueprint.md` defines a recommended architecture (service layer, constants, debounced mutations, useShallow, per-domain schemas, Controller-based form fields). The codebase currently works but has several gaps: no service layer (PocketBase calls scattered across hooks and components), no constants files, no debounce hook, and Zustand selectors that don't use `useShallow`. This plan closes those gaps incrementally.

---

## Phase 1: Constants (Low risk, ~30 min)

Create centralized constant files to eliminate raw string literals.

### Files to CREATE
- `src/constants/api.ts` — Collection name constants (`COLLECTIONS.TRANSACTIONS`, etc.)
- `src/constants/routes.ts` — Route path constants (`ROUTES.DASHBOARD`, etc.)

### Files to MODIFY (add import + replace strings)
Replace all `pb.collection('transactions')` etc. with `COLLECTIONS.*` in:
1. `src/hooks/dashboard/useDashboardData.ts`
2. `src/hooks/dashboard/useLoansData.ts`
3. `src/hooks/dashboard/useAssetsData.ts`
4. `src/hooks/dashboard/usePendingImports.ts`
5. `src/components/dashboard/forms/TransactionModal.tsx`
6. `src/components/dashboard/forms/BudgetModal.tsx`
7. `src/components/dashboard/categories/CategoryModal.tsx`
8. `src/components/dashboard/import/ImportTab.tsx`
9. `src/components/dashboard/import/PreviewTab.tsx`
10. `src/app/dashboard/transactions/page.tsx` (delete handler)
11. `src/app/dashboard/budgets/page.tsx` (delete handler)
12. `src/app/dashboard/categories/page.tsx` (delete handler)
13. `src/stores/dashboard/useUserPreferencesStore.ts`

**Verify:** `grep -r "pb\.collection('" src/` returns zero results. `npx tsc --noEmit` passes.

---

## Phase 2: Service Layer (High ROI, ~2 hrs)

Extract all `pb.collection(...)` calls into thin, typed, pure async functions. Hooks call services; components no longer import `pb` directly.

### Files to CREATE
- `src/services/categories.ts` — `getCategoriesService`, `createCategoryService`, `updateCategoryService`, `deleteCategoryService`
- `src/services/transactions.ts` — `getApprovedTransactionsService`, `createTransactionService`, `updateTransactionService`, `deleteTransactionService`
- `src/services/budgets.ts` — `getBudgetsService`, `createBudgetService`, `updateBudgetService`, `deleteBudgetService`, `findExistingBudgetService`
- `src/services/loans.ts` — `getLoansService`, `createLoanService`, `updateLoanService`, `deleteLoanService`
- `src/services/assets.ts` — `getAssetsService`, `createAssetService`, `updateAssetService`, `deleteAssetService`
- `src/services/imports.ts` — `getPendingTransactionsService`, `getImportBatchesService`, `approveTransactionService`, `rejectTransactionService`, `approveAllService`, `rejectAllService`, `createImportBatchService`, `createImportedTransactionService`, `reassignTransactionCategoryService`

### Files to MODIFY (replace `pb.collection()` calls with service imports)
- `src/hooks/dashboard/useDashboardData.ts` — queryFn calls services; join/mapping logic stays in hook
- `src/hooks/dashboard/useLoansData.ts` — `mapRecord` stays in hook, mutations call services
- `src/hooks/dashboard/useAssetsData.ts` — same pattern
- `src/hooks/dashboard/usePendingImports.ts` — all mutations call services
- `src/components/dashboard/forms/TransactionModal.tsx` — `onSubmit` calls service, remove `pb` import
- `src/components/dashboard/forms/BudgetModal.tsx` — same
- `src/components/dashboard/categories/CategoryModal.tsx` — same
- `src/components/dashboard/import/ImportTab.tsx` — calls import services
- `src/components/dashboard/import/PreviewTab.tsx` — calls `reassignTransactionCategoryService`
- `src/app/dashboard/transactions/page.tsx` — delete handler uses `deleteTransactionService`
- `src/app/dashboard/budgets/page.tsx` — delete handler uses `deleteBudgetService`
- `src/app/dashboard/categories/page.tsx` — delete handler uses `deleteCategoryService`

**Note:** `src/stores/dashboard/useUserPreferencesStore.ts` keeps its direct `pb` import — its `syncToServer` is a fire-and-forget side effect, not a data operation.

**Verify:** `grep -r "import pb from '@/lib/pocketbase'" src/` returns only `src/services/*.ts` files and the store. Create/edit/delete transactions, budgets, categories — all still work.

---

## Phase 3: useShallow for Zustand Selectors (~30 min)

Prevent unnecessary re-renders when components destructure multiple fields from a store.

### Pattern to apply
```ts
import { useShallow } from 'zustand/react/shallow';

const { preferences, setCurrency } = useUserPreferencesStore(
  useShallow((state) => ({ preferences: state.preferences, setCurrency: state.setCurrency }))
);
```

### Files to MODIFY
- `src/app/dashboard/settings/page.tsx` — 5 fields destructured, wrap with `useShallow`
- `src/app/dashboard/categories/page.tsx` — check and wrap
- `src/components/dashboard/TransactionList.tsx` — single object field `preferences`, still apply
- `src/hooks/dashboard/useFormatCurrency.ts` — same

**Verify:** `npx tsc --noEmit` passes. React DevTools Profiler shows no spurious re-renders.

---

## Phase 4: useDebouncedCallback Hook (~30 min)

Add a leading-edge debounce hook that prevents duplicate mutation calls from rapid clicks.

### File to CREATE
**`src/hooks/useDebouncedCallback.ts`** — leading-edge debounce: fires immediately, blocks re-fires within the delay window. Stable function reference across renders via `useRef`.

### Files to MODIFY
- `src/components/dashboard/forms/TransactionModal.tsx` — wrap `handleSubmit(onSubmit)` with `useDebouncedCallback`
- `src/components/dashboard/forms/BudgetModal.tsx` — same

**Verify:** Rapid clicking "Save" fires only one network request (verify in DevTools Network tab).

---

## Phase 5: Schema Splitting (~20 min)

Co-locate Zod schemas with their domain. Currently all in `src/lib/dashboard/validations.ts`.

### Files to CREATE
- `src/lib/dashboard/schemas/transaction.ts` — move `transactionSchema`, `TransactionFormData`
- `src/lib/dashboard/schemas/budget.ts` — move `budgetSchema`, `BudgetFormData`
- `src/lib/dashboard/schemas/category.ts` — extract inline `z.object(...)` from `CategoryModal.tsx`
- `src/lib/dashboard/schemas/index.ts` — barrel re-export of all schemas

### Files to MODIFY
- `src/lib/dashboard/validations.ts` — replace content with barrel re-export pointing to new files (preserves backward compatibility for any missed importer)
- `src/components/dashboard/forms/TransactionModal.tsx` — update import path
- `src/components/dashboard/forms/BudgetModal.tsx` — update import path
- `src/components/dashboard/categories/CategoryModal.tsx` — import from new schema file, remove inline `z.object`

**Verify:** Zod validation still triggers correctly in all 3 forms. `npx tsc --noEmit` passes.

---

## Phase 6: Controller-Based CurrencyInput (~45 min)

Extract the duplicated amount-formatting logic (identical ~20-line blocks in TransactionModal + BudgetModal) into a reusable `Controller`-compatible component.

### File to CREATE
**`src/components/form/CurrencyInput.tsx`** — Controller-based component that manages comma-formatted display internally, calls `field.onChange(numericValue)` so React Hook Form receives the correct number type.

**`src/components/form/index.ts`** — barrel export

### Files to MODIFY
- `src/components/dashboard/forms/TransactionModal.tsx`:
  - Add `control` to `useForm` destructure
  - Remove local `amountDisplay` state + `handleAmountChange` function
  - Replace amount field block with `<CurrencyInput control={control} name="amount" label="Amount" error={errors.amount?.message} />`
- `src/components/dashboard/forms/BudgetModal.tsx` — same changes

**Verify:** Amount field comma-formats while typing, validates positive numbers, populates correctly on edit, TypeScript compiles.

---

## Execution Order Summary

| Phase | What | New Files | Modified Files | Time |
|-------|------|-----------|----------------|------|
| 1 | Constants | 2 | 13 | 30 min |
| 2 | Service Layer | 6 | 12 | 2 hrs |
| 3 | useShallow | 0 | 4 | 30 min |
| 4 | useDebouncedCallback | 1 | 2 | 30 min |
| 5 | Schema Splitting | 4 | 3 | 20 min |
| 6 | CurrencyInput | 2 | 2 | 45 min |

**Total: 15 new files, ~36 file edits, ~4.5 hours.**

## Key Decisions

- `useUserPreferencesStore.syncToServer` keeps direct `pb` import — it's fire-and-forget, not a data query
- `mapRecord` functions stay in hooks (domain-type mapping, not raw API concern)
- `LoanModal` / `AssetModal` use plain `useState` (not RHF) — converting them is out of scope
- `validations.ts` becomes a re-export barrel (not deleted) to avoid silent breakage
