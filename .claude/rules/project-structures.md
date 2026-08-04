# Project Structure Rules

## Architecture

This project follows a Two-Tier Architecture:
1. **Public Pages**: Marketing site, visible to everyone.
2. **Dashboard**: Authenticated application.
3. **Admin**: Admin dashboard.

**Project Structure**:
- `src/app/` (Public marketing pages root)
  - `page.tsx`
  - `services/`
  - `about/`
- `src/app/dashboard/` (Authenticated User Dashboard)
- `src/app/admin/` (Admin Dashboard)

### 1. Public Pages

**Location**: `src/app/` (Root level)

Public pages are for marketing content (Home, About, Pricing, Blog).
They use shared UI components from `src/components/public/`.

**Rules**:
- **NO** `(public)` route group. Public pages sit at the root of `src/app/`.
- Use `src/components/public/` for page-specific components.
- Use `src/data/publicData.ts` for static content.

**File Structure**:
```
src/app/
├── page.tsx              # Home page
├── services/
│   └── page.tsx
├── about/
│   └── page.tsx
├── layout.tsx            # Root layout
```

---

### 2. Dashboard Pages

**Location**: `src/app/dashboard/`

Authenticated application pages (User Dashboard).
These pages require login and use `src/components/dashboard/` components.

**Features**:
- Transactions
- Budgets
- Analytics
- Categories
- Settings

**File Structure**:
```
src/app/dashboard/
├── page.tsx                    # Dashboard home
├── transactions/
│   ├── page.tsx               # Transaction list
│   └── [id]/page.tsx          # Transaction detail
├── budgets/
│   ├── page.tsx               # Budget list
│   └── [id]/page.tsx          # Budget detail
├── analytics/
│   └── page.tsx               # Analytics
├── categories/
│   └── page.tsx               # Categories
├── settings/
│   └── page.tsx               # Settings
└── layout.tsx                 # Dashboard layout
```

---

### 3. Dashboard Components

**Location**: `src/components/dashboard/`

All dashboard-specific components are organized here:

#### Main Components
- `StatCard.tsx` - KPI stat cards with gradients
- `ChartCard.tsx` - Chart wrapper cards
- `TransactionList.tsx` - Transaction list
- `TransactionItem.tsx` - Single transaction item
- `BudgetProgress.tsx` - Budget progress bars
- `CategoryBadge.tsx` - Category badges
- `QuickActions.tsx` - Quick action buttons
- `DashboardCards.tsx` - Dashboard card components

#### Charts (`src/components/dashboard/charts/`)
- `IncomeExpenseAreaChart.tsx` - Income vs expenses area chart
- `CategoryPieChart.tsx` - Spending by category pie chart
- `MonthlyComparisonBarChart.tsx` - Monthly comparison bar chart
- `SavingsGrowthLineChart.tsx` - Savings growth line chart
- `README.md` - Chart documentation

#### Layout (`src/components/dashboard/layout/`)
- `DashboardTopNav.tsx` - Top navigation bar
- `DashboardSidebar.tsx` - Sidebar navigation
- `MobileNav.tsx` - Mobile navigation
- `UserMenu.tsx` - User dropdown menu

#### Forms (`src/components/dashboard/forms/`)
- `AddTransactionForm.tsx` - Add transaction form
- `EditBudgetForm.tsx` - Edit budget form
- `CategoryForm.tsx` - Category form

---

### 4. Dashboard Utilities

**Location**: `src/lib/dashboard/`

Dashboard-specific utilities and helpers:
- `utils.ts` - Dashboard utilities
- `validations.ts` - Zod schemas for forms
- `formatters.ts` - Currency and date formatters
- `calculations.ts` - Financial calculations
- `chartHelpers.ts` - Chart data transformations

---

### 5. Dashboard Data

**Location**: `src/data/dashboard/`

Mock data for dashboard features:
- `mockTransactions.ts` - Transaction data
- `mockBudgets.ts` - Budget data
- `mockCategories.ts` - Category data
- `mockAnalytics.ts` - Analytics data

---

### 6. Dashboard State Management

**Location**: `src/stores/dashboard/`

Zustand stores for dashboard state:
- `useTransactionStore.ts` - Transaction state
- `useBudgetStore.ts` - Budget state
- `useUserPreferencesStore.ts` - User preferences

---

### 7. Dashboard Hooks

**Location**: `src/hooks/dashboard/`

React Query hooks for data fetching:
- `useTransactions.ts` - Transaction queries
- `useBudgets.ts` - Budget queries
- `useAnalytics.ts` - Analytics queries

---

### 8. Dashboard Types

**Location**: `src/types/dashboard/`

TypeScript types and interfaces:
- `transaction.ts` - Transaction types
- `budget.ts` - Budget types
- `category.ts` - Category types
- `analytics.ts` - Analytics types

---

### 9. Shared Resources

**Location**: `src/components/ui/`

Shadcn UI components used by BOTH public and dashboard:
- `button.tsx`
- `input.tsx`
- `card.tsx`
- `dialog.tsx`
- `dropdown-menu.tsx`
- `label.tsx`
- `avatar.tsx`

**Location**: `src/lib/`

Global utilities:
- `utils.ts` - General utilities (cn, etc.)
- `api/client.ts` - API client

---

### 10. Authentication

**Location**: `src/app/(auth)/`

Authentication pages:
- `login/page.tsx` - Login page
- `signup/page.tsx` - Signup page

**Location**: `src/components/auth/`

Authentication components:
- `LoginForm.tsx`
- `SignupForm.tsx`

**Location**: `src/stores/`

Auth store:
- `useAuthStore.ts` - Authentication state

---

## Workflow Rules

### ✅ DO

1. **Separate public and dashboard code**
   ```
   ✅ src/app/                  # Public pages
   ✅ src/app/dashboard/        # Dashboard pages
   ✅ src/app/admin/            # Admin pages
   ```

2. **Use dashboard folders for all dashboard-related code**
   ```
   ✅ src/components/dashboard/
   ✅ src/lib/dashboard/
   ✅ src/data/dashboard/
   ✅ src/stores/dashboard/
   ✅ src/hooks/dashboard/
   ✅ src/types/dashboard/
   ```

3. **Group related components together**
   ```
   ✅ src/components/dashboard/charts/     # All charts
   ✅ src/components/dashboard/layout/     # All layout
   ✅ src/components/dashboard/forms/      # All forms
   ```

4. **Use absolute imports**
   ```typescript
   ✅ import { IncomeExpenseAreaChart } from '@/components/dashboard/charts/IncomeExpenseAreaChart'
   ✅ import { formatCurrency } from '@/lib/dashboard/formatters'
   ✅ import { useTransactionStore } from '@/stores/dashboard/useTransactionStore'
   ```

### ❌ DON'T

1. **Don't mix public and dashboard code**
   ```
   ❌ src/components/Header.tsx  # Which header? Public or dashboard?
   ✅ src/components/public/Header.tsx
   ✅ src/components/dashboard/layout/DashboardTopNav.tsx
   ```

2. **Don't put dashboard code at root level**
   ```
   ❌ src/components/charts/
   ✅ src/components/dashboard/charts/
   
   ❌ src/lib/validations.ts  # For what? Public or dashboard?
   ✅ src/lib/dashboard/validations.ts
   ```

3. **Don't create deep nesting unnecessarily**
   ```
   ❌ src/components/dashboard/charts/area/income-expense/index.tsx
   ✅ src/components/dashboard/charts/IncomeExpenseAreaChart.tsx
   ```

4. **Don't use route groups for public pages**
   ```
   ❌ src/app/(public)/page.tsx
   ✅ src/app/page.tsx
   ```

---

## Adding New Features

### Adding a Dashboard Feature (e.g., "Goals")

1. **Create page**: `src/app/dashboard/goals/page.tsx`
2. **Create components**: `src/components/dashboard/GoalCard.tsx`
3. **Create types**: `src/types/dashboard/goal.ts`
4. **Create store**: `src/stores/dashboard/useGoalStore.ts`
5. **Create hooks**: `src/hooks/dashboard/useGoals.ts`
6. **Create data**: `src/data/dashboard/mockGoals.ts`
7. **Create utils**: `src/lib/dashboard/goalCalculations.ts`

### Adding a Public Page (e.g., "FAQ")

1. **Create page**: `src/app/faq/page.tsx`
2. **Create components**: `src/components/public/FAQAccordion.tsx`
3. **Add data**: `src/data/publicData.ts` (add FAQ data)

---

## Import Path Examples

### Dashboard Components
```typescript
import { IncomeExpenseAreaChart } from '@/components/dashboard/charts/IncomeExpenseAreaChart'
import { StatCard } from '@/components/dashboard/DashboardCards'
import { DashboardTopNav } from '@/components/dashboard/layout/DashboardTopNav'
```

### Dashboard Utilities
```typescript
import { formatCurrency } from '@/lib/dashboard/formatters'
import { calculateSavings } from '@/lib/dashboard/calculations'
import { transactionSchema } from '@/lib/dashboard/validations'
```

### Dashboard Data & Stores
```typescript
import { mockTransactions } from '@/data/dashboard/mockTransactions'
import { useTransactionStore } from '@/stores/dashboard/useTransactionStore'
import { useTransactions } from '@/hooks/dashboard/useTransactions'
```

### Public Components
```typescript
import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { HeroSection } from '@/components/public/HeroSection'
```

### Shared UI Components
```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
```
