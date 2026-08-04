---
name: component-size
description: Rules for keeping component and hook files at a manageable size by splitting into smaller, focused files.
---

# Component & File Size

No component or hook file should exceed ~250 lines. When a file grows beyond that, split it.

---

## When to split

| What's getting large | How to split |
|---|---|
| A container component has many UI sections | Extract each section as its own component (e.g. `TransactionSummary.tsx`, `BudgetProgress.tsx`) |
| Modal JSX is inline in the container | Move it to `Add<Entity>Modal.tsx` / `Edit<Entity>Modal.tsx` |
| A list renders complex row markup | Extract `<Entity>Item.tsx` or `<Entity>Row.tsx` |
| Form fields are long | Extract `<Entity>Form.tsx` as a standalone component |
| A hook file handles queries AND mutations AND transforms | Split into `use<Entity>List.ts` and `use<Entity>Mutations.ts` |
| A feature has many subcomponents | Use a subfolder under `src/components/dashboard/<feature>/` |

---

## Naming the split files

The name must describe what the component *is*, not where it lives:

- `<Entity>Table.tsx` — the data table
- `<Entity>Filter.tsx` — filter controls
- `Add<Entity>Modal.tsx` / `Edit<Entity>Modal.tsx` — create vs edit dialogs
- `<Entity>Item.tsx` — a single row, card, or list entry
- `<Entity>Form.tsx` — a standalone form or fieldset
- `<Entity>sContainer.tsx` — the orchestrator container for a feature

---

## What stays in the container

The container (`<Entity>sContainer.tsx`) owns hooks, state, and passes data down. It should not grow with inline JSX for modals, table rows, or large form blocks. Keep it as an orchestrator, not a monolith.

---

## Next.js specific

- `page.tsx` files must stay thin — they only render the container component. Business logic, hooks, and JSX beyond a single import belong in the container, not the page.
- `layout.tsx` files only handle layout structure and auth guards — no feature-specific logic.
