# Quick start

A **five-minute** path from install to a guarded button and a hook-based check.

## When to use

- First time integrating the library
- You want copy-paste snippets that match the real API

## Example

```tsx
import {
  RoleGuardProvider,
  Can,
  useCan,
} from 'advanced-react-role-guard';

export function App() {
  return (
    <RoleGuardProvider
      user={{ roles: ['admin'], permissions: [] }}
      config={{
        roles: { admin: ['user:delete', 'user:edit'] },
      }}
    >
      <Toolbar />
    </RoleGuardProvider>
  );
}

function Toolbar() {
  const canDelete = useCan({ permission: 'user:delete' });

  return (
    <nav>
      <Can permission="user:edit" fallback={<span>Read-only</span>}>
        <button type="button">Edit</button>
      </Can>
      {canDelete ? (
        <button type="button">Delete</button>
      ) : null}
    </nav>
  );
}
```

## Checklist

1. Wrap the tree with `RoleGuardProvider` (`user` + `config`).
2. Use `<Can permission="…" />` or `<Can role="…" />` for declarative UI.
3. Use `useCan({ permission: '…' })` (or `role` / `permissions`) for imperative branches.

## Pitfalls

- Forgetting the provider → `useCan` throws (components that use context must be under `RoleGuardProvider`).
- Using `match` without an array → `match` applies only to `{ permissions: [...] }` on `useCan` and on `Can` / `Guard`.

## Best practices

- Keep **role-to-permission** maps in `config.roles`; put **direct grants** on `user.permissions` when the API sends them explicitly.

## Common mistakes

- Expecting `post:*` in `user.permissions` to imply every `post:*` action — **prefix wildcards apply to entries under `config.roles` for each role**, not as pattern expansion on arbitrary strings in `user.permissions` (see [Permissions model](/guide/permissions-model)).
