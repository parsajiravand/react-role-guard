# RoleGuardProvider

Supplies **user**, **role-to-permission mapping**, and **feature flags** to all child components via React context.

## When to use

- Once at the root of the tree (or per logical subtree) so `Can`, `Guard`, `Feature`, and `useCan` share state.

## Signature

```tsx
import { RoleGuardProvider } from 'advanced-react-role-guard';

<RoleGuardProvider user={user} config={config}>
  {children}
</RoleGuardProvider>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `user` | `User \| null \| undefined` | Current user; defaults to `null`. |
| `user.roles` | `string[]` | Optional role names. |
| `user.permissions` | `string[]` | Optional direct permission strings. |
| `config` | `RoleGuardConfig` | Optional; defaults to `{}`. |
| `config.roles` | `Record<string, string[]>` | Maps role name → permission list (supports `*` and `prefix:*`). |
| `config.features` | `Record<string, boolean>` | Feature flag map. |
| `children` | `ReactNode` | App tree. |

## Behavior

- **Memoized context** — `user` and `config` are recomputed when dependencies change.
- Children receive `hasRole`, `hasPermission`, `hasAnyPermission`, `hasAllPermissions`, and `hasFeature` through context (see [`useCan`](/api/use-can) and [`Feature`](/api/feature)).

## Edge cases

- **`user` is `null` or `undefined`** — Treated as no roles and no permissions; role checks fail; permission checks fail unless you rely solely on `config` (feature flags still read `config.features`).
- **Empty `config.roles`** — Only `user.permissions` (and `*` rules) apply.

## Error / fallback

The provider does **not** throw on invalid props. **Consumers** throw if `useRoleGuardContext` / hooks are used outside the provider.

## Examples

### Simple

```tsx
<RoleGuardProvider
  user={{ roles: ['viewer'] }}
  config={{
    roles: {
      viewer: ['doc:read'],
    },
  }}
>
  <App />
</RoleGuardProvider>
```

### Advanced (roles + features)

```tsx
<RoleGuardProvider
  user={{
    roles: ['editor'],
    permissions: ['audit:view'],
  }}
  config={{
    roles: {
      editor: ['post:*', 'comment:moderate'],
      admin: ['*'],
    },
    features: {
      newEditor: true,
    },
  }}
>
  <App />
</RoleGuardProvider>
```

## Do / don’t

| Do | Don’t |
|----|--------|
| Keep `config.roles` and `user.roles` naming aligned | Put secrets in `config` expecting them to stay hidden |
| Pass plain objects for serialization across SSR boundaries | Rely on this provider alone for API security |

## Advanced exports

- **`useRoleGuardContext`** — Low-level access to the full context value; **throws** if used outside `RoleGuardProvider`.
- **Exported types** — `User`, `Role`, `Permission`, `RoleConfig`, `Features`, `RoleGuardConfig`, `RoleGuardProviderProps`, etc.
