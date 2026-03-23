# useCan

Hook that returns a **boolean** for a **role**, **single permission**, or **multiple permissions** with **`match`**.

## When to use

- Branch in logic (`if`, ternary, early `return`) instead of wrapping JSX in **`Can`**.

## Signature

```ts
function useCan(
  params:
    | { role: string }
    | { permission: string }
    | { permissions: string[]; match?: 'any' | 'all' }
): boolean;
```

## Parameters

| Shape | Description |
|-------|-------------|
| `{ role }` | `true` if the user has that role. |
| `{ permission }` | `true` if `hasPermission` allows it (direct, `*`, role-derived, wildcards). |
| `{ permissions, match? }` | `match: 'any'` (default) → any one; `'all'` → every permission. |

There is **no string shorthand** — always pass an object.

## Behavior

- Uses `useRoleGuardContext` and delegates to `hasRole`, `hasPermission`, `hasAnyPermission`, or `hasAllPermissions`.
- If no branch matches (should not happen with correct typing), returns **`false`**.

## Edge cases

- **`permissions: []`** — `any` → `false`; `all` → `true` (vacuous); validate in your app if needed.

## Error / fallback

**Throws** if called outside `RoleGuardProvider` (via `useRoleGuardContext`).

## Examples

### Simple

```tsx
function Toolbar() {
  const canDelete = useCan({ permission: 'user:delete' });

  return canDelete ? <button type="button">Delete</button> : null;
}
```

### Advanced

```tsx
function BillingActions() {
  const canExport = useCan({
    permissions: ['billing:view', 'billing:export'],
    match: 'all',
  });

  return canExport ? <ExportButton /> : null;
}
```

## Do / don’t

| Do | Don’t |
|----|--------|
| Use for **imperative** logic | Pass a string instead of `{ permission: '…' }` |

## Pitfalls

- **`Can` / `Guard`** use this hook internally — keep rules **consistent** across hook and components.
