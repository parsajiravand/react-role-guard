# Can

Declarative **conditional render** based on a **single role**, **single permission**, or **multiple permissions** with `match`.

## When to use

- Show/hide UI elements without manual `if` in the component body.

## Signature

```tsx
import { Can } from 'advanced-react-role-guard';

<Can role={role} children={...} />
<Can permission={permission} fallback={...} children={...} />
<Can permissions={permissions} match="any" | "all" children={...} />
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

- Delegates to [`useCan`](/api/use-can) and renders **`children`** if allowed, otherwise **`fallback`**.
- `match` applies only when **`permissions`** is an array.

## Edge cases

- **Conflicting props** — The implementation passes props through to `useCan`; prefer **one** of `role`, `permission`, or `permissions` in practice.
- **Empty `permissions` array** — `hasAnyPermission` / `hasAllPermissions` over an empty list: typically `any` → `false`, `all` → `true` (vacuous); confirm behavior in your app.

## Error / fallback

The component **does not throw**; denied access renders **`fallback`**.

## Examples

### Simple

```tsx
<Can role="admin">
  <AdminPanel />
</Can>
```

### Advanced (fallback + `match`)

```tsx
<Can
  permissions={['order:edit', 'order:cancel']}
  match="all"
  fallback={<span className="muted">No order actions</span>}
>
  <OrderActions />
</Can>
```

## Do / don’t

| Do | Don’t |
|----|--------|
| Use for **UI gating** | Assume this hides data from determined users |
| Use `fallback` for empty states | Use for **server-side** authorization |

## Pitfalls

- **`Guard`** is identical in behavior; use naming that fits your file (see [Guard](/api/guard)).
