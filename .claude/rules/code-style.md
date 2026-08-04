# Code style

- Always use TypeScript strict mode — no `any`
- Always use named exports for components and hooks
- Always use absolute imports from `@/`
- File names: kebab-case for all files (`task-detail-modal.tsx`)
- Component names: PascalCase (`TaskDetailModal`)
- Hook/service/util files: camelCase (`useAuth.ts`, `tasks.ts`)
- Service functions: `verb + Entity + Service` pattern (`getTaskListService`, `createTaskService`)
- Constants: `UPPER_SNAKE_CASE` (`API_ROUTES`, `APP_ROUTES`)
- Zustand stores: `use + Name + Store` (`useAuthStore`)
- React Query keys: kebab-case string array (`['task-list', filters]`)
- URL paths: kebab-case (`/products/gold-rings`)
- Boolean variables: `is` / `has` prefix (`isOpen`, `hasPermission`)
- Event handler props: `on` prefix (`onSuccess`, `onClose`)
- Internal handlers: `handle` prefix (`handleFilterChange`, `handleSubmit`)
- TypeScript interfaces: PascalCase, no `I` prefix unless ambiguous (`Task`, `ApiResponse<T>`)
- TypeScript types: PascalCase (`TaskStatus`, `UserRole`)
