# Getting started

Install **advanced-react-role-guard** and wrap your app with `RoleGuardProvider`. Use `Can`, `Guard`, `Feature`, or `useCan` wherever you need conditional UI or route gates.

## When to use

- You want **one place** to define role-to-permission mappings and feature flags.
- You prefer **declarative** checks in JSX instead of nested `if` statements.
- You need **consistent** behavior between components, hooks, and route-level guards.

## Install

```bash
npm install advanced-react-role-guard
```

Peer dependencies: `react` and `react-dom` (≥ 19). The library is **developed and tested on React 19 and later**.

## Minimal setup

```tsx
import {
  RoleGuardProvider,
  Can,
  useCan,
} from 'advanced-react-role-guard';

function App() {
  return (
    <RoleGuardProvider
      user={{
        roles: ['editor'],
        permissions: ['post:create'],
      }}
      config={{
        roles: {
          admin: ['*'],
          editor: ['post:create', 'post:update'],
        },
        features: {
          newEditor: true,
        },
      }}
    >
      <Dashboard />
    </RoleGuardProvider>
  );
}

function Dashboard() {
  const canPublish = useCan({ permission: 'post:publish' });

  return (
    <div>
      <Can role="admin">
        <AdminLink />
      </Can>
      <Can permission="post:create">
        <CreatePostButton />
      </Can>
      {canPublish ? <PublishButton /> : null}
    </div>
  );
}
```

## Next steps

- [Quick start](/guide/quick-start) — fastest path to a working screen
- [Permissions model](/guide/permissions-model) — wildcards, roles, and `match`
- [Next.js](/guide/nextjs) or [React Router](/guide/react-router) — framework patterns

## Pitfalls

- **`useCan` takes an object**, never a bare string. Use `{ permission: 'x' }`, not `useCan('x')`.
- **Client-side checks are not server security.** Always enforce authorization on the server/API too (see [Security](/security)).
