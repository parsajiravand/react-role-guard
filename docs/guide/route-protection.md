# Route protection

Use **`Guard`** or **`Can`** at route boundaries. They share the same permission logic; pick a name that matches your team’s convention (e.g. `Guard` for “route wall”, `Can` for inline UI).

## When to use

- You want **one component** wrapping the page or `<Outlet />` when access is denied
- You need a **fallback** (redirect, 403, empty state)

## Example (generic)

```tsx
import { Guard } from 'advanced-react-role-guard';

export function ProtectedPage() {
  return (
    <Guard role="admin" fallback={<p>Forbidden</p>}>
      <AdminHome />
    </Guard>
  );
}
```

```tsx
<Guard
  permissions={['billing:view', 'billing:export']}
  match="all"
  fallback={<p>Missing billing access</p>}
>
  <BillingExportPage />
</Guard>
```

## Fallback patterns

- **Inline message** — `fallback={<p>…</p>}` or a small card.
- **Redirect** — In React Router, use `<Navigate />` as `fallback` (see [React Router](/guide/react-router) — import from `react-router-dom`).

## Pitfalls

- **Guards are client-side.** Anyone can bypass UI; protect APIs and data on the server.
- `Guard` and `Can` are **implementation-identical**; choose based on semantics.

## Best practices

- Centralize **route-level** guards in a layout or route `element` so every child inherits the same check.
- Pair with **server authorization** for every mutation.

## Common mistakes

- Nesting multiple `Guard` components with different `match` values without documenting which rule applies — prefer one guard per route segment.
