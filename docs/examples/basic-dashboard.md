# Basic dashboard

A **single-tenant** dashboard with role-based sections and a permission-gated action.

## When to use

- Admin vs editor vs viewer layouts
- You want copy-paste **TypeScript** with `RoleGuardProvider` at the top

## Example

```tsx
import {
  RoleGuardProvider,
  Can,
  useCan,
} from 'advanced-react-role-guard';

const user = {
  roles: ['editor'] as const,
  permissions: [] as string[],
};

const config = {
  roles: {
    admin: ['*'] as string[],
    editor: ['post:create', 'post:update', 'analytics:view'],
    viewer: ['post:read'],
  },
};

export function App() {
  return (
    <RoleGuardProvider user={user} config={config}>
      <Dashboard />
    </RoleGuardProvider>
  );
}

function Dashboard() {
  const canPublish = useCan({
    permissions: ['post:update', 'post:publish'],
    match: 'any',
  });

  return (
    <main>
      <h1>Dashboard</h1>

      <Can role="admin">
        <section>
          <h2>Admin</h2>
          <p>Visible only to admins.</p>
        </section>
      </Can>

      <Can permission="analytics:view">
        <section>
          <h2>Analytics</h2>
        </section>
      </Can>

      <Can
        permission="post:create"
        fallback={<p>You cannot create posts.</p>}
      >
        <button type="button">New post</button>
      </Can>

      {canPublish ? (
        <button type="button">Publish</button>
      ) : null}
    </main>
  );
}
```

## Pitfalls

- **`post:publish`** must be granted by role or direct permission for `canPublish` to be true — adjust `config` to match your product.

## Best practices

- Centralize **`user` and `config`** from your auth layer instead of hardcoding.
