# React Router

Wrap **`BrowserRouter`** (or your router) with `RoleGuardProvider`, then protect routes with **`Guard`** or **`Can`** and use **`Navigate`** for redirects.

## When to use

- React Router v6 / v7 `element` / `loader` patterns
- You want a **403** or **login redirect** when access is denied

## Example

```tsx
import { Navigate, Route, Routes } from 'react-router-dom';
import { Guard, RoleGuardProvider } from 'advanced-react-role-guard';

export function App() {
  return (
    <RoleGuardProvider
      user={{ roles: ['admin'] }}
      config={{ roles: { admin: ['*'] } }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <Guard role="admin" fallback={<Navigate to="/403" replace />}>
              <AdminPage />
            </Guard>
          }
        />
      </Routes>
    </RoleGuardProvider>
  );
}
```

## Multiple permissions

```tsx
<Route
  path="/billing/export"
  element={
    <Guard
      permissions={['billing:view', 'billing:export']}
      match="all"
      fallback={<Navigate to="/403" replace />}
    >
      <BillingExport />
    </Guard>
  }
/>
```

## Layout routes

Apply `Guard` on a **parent** route so all nested children share the same gate:

```tsx
<Route
  path="/app"
  element={
    <Guard permission="app:login" fallback={<Navigate to="/login" replace />}>
      <AppLayout />
    </Guard>
  }
>
  <Route path="dashboard" element={<Dashboard />} />
</Route>
```

## Pitfalls

- **`Navigate` must be imported** from `react-router-dom`; it is not part of this library.
- Remember **`replace`** on redirects when you do not want the forbidden URL in history.

## Best practices

- Load **user + config** in a data layer (loader, `useEffect`, or auth context) and pass into `RoleGuardProvider` once at the router root.
- Keep route paths and permission names **documented** for your team.

## Common mistakes

- Mounting `RoleGuardProvider` **inside** a route that is already guarded — usually redundant; prefer one provider at app root.
