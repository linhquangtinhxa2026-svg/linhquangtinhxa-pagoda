# Next.js + TypeScript Project Blueprint

A personal project architecture guide inspired by the domain-driven structure of this codebase — adapted for Next.js App Router with TypeScript.

**Tech stack:** Next.js 14+ (App Router), TypeScript, Zustand, TanStack React Query v5, React Hook Form, Zod, Axios, Tailwind CSS, shadcn/ui (or any component library)

> Zod replaces Yup — it has better TypeScript inference (your schema automatically becomes your type).

---

## Folder Structure

```
src/
├── app/                        # Next.js App Router — routing only
│   ├── (auth)/                 # Route group — protected pages
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── tasks/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── layout.tsx          # Auth guard layout
│   ├── (public)/               # Route group — public pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx              # Root layout (providers)
│   └── globals.css
│
├── features/                   # Domain-driven feature modules
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── hooks.ts            # useLogin, useRegister mutations
│   │   ├── schemas.ts          # Zod validation schemas
│   │   └── types.ts            # Auth-specific types
│   ├── tasks/
│   │   ├── components/
│   │   │   ├── TaskTable.tsx
│   │   │   ├── TaskFilter.tsx
│   │   │   └── TaskDetailModal.tsx
│   │   ├── hooks.ts            # useGetTasks, useCreateTask, etc.
│   │   ├── schemas.ts
│   │   └── types.ts
│   └── [other-domain]/
│       ├── components/
│       ├── hooks.ts
│       ├── schemas.ts
│       └── types.ts
│
├── services/                   # API call functions — one file per domain
│   ├── auth.ts
│   ├── tasks.ts
│   └── users.ts
│
├── stores/                     # Zustand global state
│   ├── auth.ts
│   └── [other-global-state].ts
│
├── hooks/                      # Cross-feature shared hooks
│   ├── useAuth.ts
│   └── useDebouncedCallback.ts
│
├── components/                 # Shared UI components
│   ├── ui/                     # Primitives / library wrappers
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── form/                   # React Hook Form field components
│   │   ├── InputField.tsx
│   │   ├── SelectField.tsx
│   │   └── DatePickerField.tsx
│   └── common/                 # App-specific shared components
│       └── PageTitle.tsx
│
├── lib/                        # Third-party config
│   ├── axios.ts                # Axios instance + interceptors
│   ├── query-client.ts         # React Query client config
│   └── providers.tsx           # All providers wrapped together
│
├── constants/                  # App-wide constants
│   ├── api.ts                  # API endpoint strings
│   └── routes.ts               # Route path constants
│
├── types/                      # Shared/global TypeScript types
│   ├── api.ts                  # API response wrapper types
│   └── index.ts
│
└── utils/                      # Pure helper functions
    ├── storage.ts
    └── format.ts
```

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Folders | kebab-case | `task-management/`, `drop-and-collect/` |
| Component files | PascalCase `.tsx` | `TaskTable.tsx`, `DetailModal.tsx` |
| Hook / service / util files | camelCase `.ts` | `useAuth.ts`, `tasks.ts` |
| React components | PascalCase | `export function TaskTable()` |
| Service functions | `verb + Entity + Service` | `getTaskListService`, `createTaskService` |
| Constants | `UPPER_SNAKE_CASE` | `API_ROUTES`, `APP_ROUTES` |
| TypeScript interfaces | PascalCase with `I` prefix optional | `Task`, `TaskFilter`, `ApiResponse<T>` |
| TypeScript types | PascalCase | `TaskStatus`, `UserRole` |
| Zustand stores | `use + Name + Store` | `useAuthStore`, `useSettingsStore` |
| React Query keys | kebab-case string array | `['task-list', filters]` |
| URL paths | kebab-case | `/tasks/work-orders` |
| Boolean variables | `is` / `has` prefix | `isOpen`, `isLoading`, `hasPermission` |
| Event handler props | `on` prefix | `onSuccess`, `onClose`, `onChange` |
| Internal handlers | `handle` prefix | `handleFilterChange`, `handleSubmit` |

---

## Types — Define Them Per Feature

Each feature owns its types. Only types used across multiple features go in `src/types/`.

```ts
// src/types/api.ts — shared API wrapper shape
export interface ApiResponse<T> {
  data: T
  message: string
  code: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  items_per_page: number
}
```

```ts
// src/features/tasks/types.ts — task-specific types
export type TaskStatus = 'submitted' | 'pending' | 'in_progress' | 'completed' | 'overdue'

export interface Task {
  id: number
  title: string
  status: TaskStatus
  assigned_to: number | null
  created_at: string
  updated_at: string
}

export interface TaskFilter {
  page?: number
  items_per_page?: number
  status?: TaskStatus
  search?: string
}
```

---

## Services — Dumb API Wrappers

One file per domain. Each function calls Axios and returns the raw response. No logic.

```ts
// src/services/tasks.ts
import axiosInstance from '@/lib/axios'
import { API } from '@/constants/api'
import type { ApiResponse, PaginatedResponse } from '@/types/api'
import type { Task, TaskFilter } from '@/features/tasks/types'

export const getTaskListService = async (params: TaskFilter): Promise<ApiResponse<PaginatedResponse<Task>>> => {
  const { data } = await axiosInstance.get(API.TASKS.LIST, { params })
  return data
}

export const getTaskDetailService = async (id: number): Promise<ApiResponse<Task>> => {
  const { data } = await axiosInstance.get(API.TASKS.DETAIL.replace(':id', String(id)))
  return data
}

export const createTaskService = async (body: FormData): Promise<ApiResponse<Task>> => {
  const { data } = await axiosInstance.post(API.TASKS.CREATE, body)
  return data
}

export const updateTaskService = async (id: number, body: FormData): Promise<ApiResponse<Task>> => {
  const { data } = await axiosInstance.post(API.TASKS.UPDATE.replace(':id', String(id)), body)
  return data
}

export const deleteTaskService = async (id: number): Promise<ApiResponse<null>> => {
  const { data } = await axiosInstance.post(API.TASKS.DELETE.replace(':id', String(id)))
  return data
}
```

---

## Hooks — React Query Wrappers Per Feature

Each feature has a `hooks.ts` with all its queries and mutations. The pattern is identical to this project but with TypeScript generics.

```ts
// src/features/tasks/hooks.ts
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTaskService,
  deleteTaskService,
  getTaskDetailService,
  getTaskListService,
  updateTaskService,
} from '@/services/tasks'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import type { TaskFilter } from './types'

// ─── Queries ────────────────────────────────────────────────────────────────

export function useGetTaskList(filters: TaskFilter) {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['task-list', filters],
    queryFn: () => getTaskListService(filters),
    placeholderData: keepPreviousData,
  })

  return {
    data: data?.data,
    isLoading,
    isFetching,
    error,
    refetch,
  }
}

export function useGetTaskDetail(id: number | undefined) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['task-detail', id],
    queryFn: () => getTaskDetailService(id!),
    enabled: !!id,           // only fetch when id exists
    placeholderData: keepPreviousData,
  })

  return { data: data?.data, isLoading, isFetching, error }
}

// ─── Mutations ───────────────────────────────────────────────────────────────

interface MutationOptions {
  onSuccess?: (res: unknown) => void
  onError?: (error: unknown) => void
}

export function useCreateTask({ onSuccess, onError }: MutationOptions = {}) {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: (body: FormData) => createTaskService(body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['task-list'] })
      onSuccess?.(res)
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  const doCreate = useDebouncedCallback(mutate)

  return { doCreate, isLoading: isPending, error }
}

export function useUpdateTask({ onSuccess, onError }: MutationOptions = {}) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: FormData }) => updateTaskService(id, body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['task-list'] })
      queryClient.invalidateQueries({ queryKey: ['task-detail'] })
      onSuccess?.(res)
    },
    onError,
  })

  const doUpdate = useDebouncedCallback(mutate)

  return { doUpdate, isLoading: isPending }
}

export function useDeleteTask({ onSuccess, onError }: MutationOptions = {}) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteTaskService(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['task-list'] })
      onSuccess?.(res)
    },
    onError,
  })

  const doDelete = useDebouncedCallback(mutate)

  return { doDelete, isLoading: isPending }
}
```

---

## Zustand Stores — Global Client State Only

Only use Zustand for state every page needs instantly without an API call. Keep it minimal.

```ts
// src/stores/auth.ts
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

interface User {
  id: number
  name: string
  email: string
  role: UserRole
}

type UserRole = 'admin' | 'user' | 'guest'

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
}))
```

Always use `useShallow` when selecting multiple fields to avoid unnecessary re-renders:

```ts
// src/hooks/useAuth.ts
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const { user, isLoggedIn, setUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isLoggedIn: state.isLoggedIn,
      setUser: state.setUser,
    }))
  )

  const isAdmin = user?.role === 'admin'

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return { user, isLoggedIn, isAdmin, logout, setUser }
}
```

---

## Zod Schemas — Validation with Automatic Types

Zod gives you validation AND the TypeScript type from one definition. Define schemas in `schemas.ts` inside each feature.

```ts
// src/features/tasks/schemas.ts
import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().optional(),
  status: z.enum(['submitted', 'pending', 'in_progress', 'completed']),
  due_date: z.string().optional(),
  assigned_to: z.number().optional(),
})

// Type is automatically inferred from the schema — no manual interface needed
export type CreateTaskForm = z.infer<typeof createTaskSchema>
```

---

## Form Components — Controller-Wrapped Fields

Pre-built field components handle label, error display, and React Hook Form wiring. Build these once in `src/components/form/` and reuse everywhere.

```tsx
// src/components/form/InputField.tsx
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
  disabled,
}: InputFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>
            {label}
            {required && <span className='ml-1 text-red-500'>*</span>}
          </label>
          <input
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            className='rounded-md border px-3 py-2 text-sm disabled:opacity-50'
          />
          {error?.message && (
            <p className='text-xs text-red-500'>{error.message}</p>
          )}
        </div>
      )}
    />
  )
}
```

Using it in a form:

```tsx
// src/features/tasks/components/TaskForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from '@/components/form/InputField'
import { createTaskSchema, type CreateTaskForm } from '../schemas'
import { useCreateTask } from '../hooks'

export function TaskForm({ onSuccess }: { onSuccess: () => void }) {
  const { control, handleSubmit, reset } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { status: 'submitted' },
  })

  const { doCreate, isLoading } = useCreateTask({
    onSuccess: () => {
      reset()
      onSuccess()
    },
  })

  const onSubmit = (values: CreateTaskForm) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, String(value))
    })
    doCreate(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <InputField control={control} name='title' label='Title' required />
      <InputField control={control} name='description' label='Description' />
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Create Task'}
      </button>
    </form>
  )
}
```

---

## Axios Setup

```ts
// src/lib/axios.ts
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear()
      window.location.replace('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
```

---

## Providers — Wrap Everything in Root Layout

```tsx
// src/lib/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000 * 60, // 1 minute
            refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

```tsx
// src/app/layout.tsx
import { Providers } from '@/lib/providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

---

## API Constants

```ts
// src/constants/api.ts
export const API = {
  AUTH: {
    LOGIN: '/v1/auth/login',
    LOGOUT: '/v1/auth/logout',
    REFRESH: '/v1/auth/refresh',
    ME: '/v1/auth/me',
  },
  TASKS: {
    LIST: '/v1/tasks',
    DETAIL: '/v1/tasks/:id',
    CREATE: '/v1/tasks/create',
    UPDATE: '/v1/tasks/:id/update',
    DELETE: '/v1/tasks/:id/delete',
  },
} as const
```

```ts
// src/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TASKS: {
    INDEX: '/tasks',
    DETAIL: '/tasks/:id',
    CREATE: '/tasks/create',
  },
} as const
```

---

## Page Component — Putting It All Together

In Next.js App Router, `page.tsx` is the route entry. Keep it thin — just compose the feature container.

```tsx
// src/app/(auth)/tasks/page.tsx
import { TasksContainer } from '@/features/tasks/components/TasksContainer'

export default function TasksPage() {
  return <TasksContainer />
}
```

```tsx
// src/features/tasks/components/TasksContainer.tsx — the container
'use client'

import { useState } from 'react'
import { useGetTaskList } from '../hooks'
import { TaskTable } from './TaskTable'
import { TaskFilter } from './TaskFilter'
import { TaskDetailModal } from './TaskDetailModal'
import type { Task, TaskFilter as TaskFilterType } from '../types'

export function TasksContainer() {
  const [filter, setFilter] = useState<TaskFilterType>({ items_per_page: 20 })
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const { data, isLoading, isFetching } = useGetTaskList(filter)

  const handleFilterChange = (updated: Partial<TaskFilterType>) => {
    setFilter((prev) => ({ ...prev, ...updated }))
  }

  const onView = (task: Task) => setSelectedTask(task)
  const onClose = () => setSelectedTask(null)

  return (
    <div>
      <TaskFilter filter={filter} onChange={handleFilterChange} />
      <TaskTable
        data={data}
        isLoading={isLoading || isFetching}
        onView={onView}
      />
      {selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={onClose} />
      )}
    </div>
  )
}
```

---

## Decision Guide

```
Is this data from an API?
  YES → React Query (useQuery / useMutation in features/*/hooks.ts)

  NO → Does every page need it immediately without an API call?
    YES → Zustand (src/stores/) — use useShallow when selecting multiple fields
    NO  → Does it need to survive page refresh?
      YES → localStorage + useState
      NO  → useState (modal open, selected item, etc.)
```

---

## Adding a New Feature — Checklist

1. Create `src/features/<domain>/` folder (kebab-case)
2. Define types in `types.ts`
3. Define Zod schemas in `schemas.ts`
4. Add API endpoint constants to `src/constants/api.ts`
5. Add service functions to `src/services/<domain>.ts` (dumb wrappers only)
6. Write React Query hooks in `hooks.ts` (one hook per query/mutation)
7. Build `components/` — one container + presentational components
8. Add the route in `src/app/` — keep `page.tsx` thin, import the container
9. If gating by auth, add logic in the `(auth)/layout.tsx` route group
