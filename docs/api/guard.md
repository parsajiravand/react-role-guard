# Guard

Same behavior as **`Can`**: conditional render from **role**, **permission**, or **permissions** + **`match`**.

## When to use

- **Route-level** or “page shell” checks where the name `Guard` reads better than `Can`.

## Signature

```tsx
import { Guard } from 'advanced-react-role-guard';

<Guard role={role} children={...} />
<Guard permission={permission} fallback={...} children={...} />
<Guard permissions={permissions} match="any" | "all" children={...} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `role` | `string` | — | Require this role. |
| `permission` | `string` | — | Require this permission. |
| `permissions` | `string[]` | — | Require a set of permissions. |
| `match` | `'any' \| 'all'` | `'any'` | When using `permissions`, require any one or all. |
| `fallback` | `ReactNode` | `null` | Rendered when access is denied. |
| `children` | `ReactNode` | required | Rendered when access is granted. |

## Behavior

- Implementation matches **`Can`** line-for-line: both call [`useCan`](/api/use-can) with the same props.

## Edge cases

- Same as **`Can`** — see [Can](/api/can).

## Error / fallback

Renders **`fallback`** when access is denied; does **not** throw.

## Examples

### Simple (route-style)

```tsx
<Guard role="admin" fallback={<p>Forbidden</p>}>
  <AdminHome />
</Guard>
```

### Advanced (React Router redirect)

```tsx
import { Navigate } from 'react-router-dom';

<Guard
  permission="billing:export"
  fallback={<Navigate to="/403" replace />}
>
  <ExportPage />
</Guard>
```

## Do / don’t

| Do | Don’t |
|----|--------|
| Pair with **`Navigate`** for SPA redirects | Forget API-side checks |

## Pitfalls

- **Naming only** — If your team prefers one component, using **`Can` everywhere** is fine.
