# Forms

- Always use React Hook Form — never raw controlled inputs for forms
- Always use Yup for validation schema — never manual validation logic
- Always use `yupResolver` from `@hookform/resolvers/yup` as the resolver
- Always define the Yup schema in `features/[domain]/schemas.ts`, separate from the component
- Always infer TypeScript types from the schema using Yup's `InferType`:
  ```ts
  import type { InferType } from 'yup'
  export type CreateProductForm = InferType<typeof createProductSchema>
  ```
- Always build reusable field components in `src/components/form/` (InputField, SelectField, etc.)
- Field components always accept `control`, `name`, `label` — wired via `Controller`
- Always display field-level errors from `fieldState.error.message` inside the field component
- Never put validation logic inside components — schemas own all validation
