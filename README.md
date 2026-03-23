# Simple React Role Guard

> Declarative role & permission guards for React apps

[![npm version](https://badge.fury.io/js/advanced-react-role-guard.svg)](https://badge.fury.io/js/advanced-react-role-guard)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-%3E%3D19-61dafb.svg)](https://react.dev/)

Centralize **roles, permissions, and feature access** in React apps. No more scattered `if (user.role === "admin")` everywhere.

**Links**

- **Documentation:** [advanced-react-role-guard-doc.netlify.app](https://advanced-react-role-guard-doc.netlify.app/)
- **Live demo:** [advanced-react-role-guard-website.netlify.app](https://advanced-react-role-guard-website.netlify.app/)
- **Repository:** [github.com/parsajiravand/react-role-guard](https://github.com/parsajiravand/react-role-guard)
- **npm:** [advanced-react-role-guard](https://www.npmjs.com/package/advanced-react-role-guard)

**Compatibility:** This package targets **React 19 and later** (`react` and `react-dom` ≥ 19). It is developed and tested against current React 19+ releases.

## ✨ Features

- ✅ **Role-based rendering** - Declarative role checks
- ✅ **Permission-based rendering** - Granular permission control
- ✅ **Route protection** - Guard routes with roles/permissions
- ✅ **Feature flags** - Lightweight feature toggles
- ✅ **Framework-agnostic** - Works with React / Next.js
- ✅ **SSR-safe** - Server-side rendering compatible
- ✅ **TypeScript** - Full type safety
- ✅ **Wildcard permissions** - Support for `user:*` patterns

## 🚀 Installation

```bash
npm install advanced-react-role-guard
```

## 📖 Quick Start

```tsx
import { RoleGuardProvider, Can, useCan } from "advanced-react-role-guard";

function App() {
  return (
    <RoleGuardProvider
      user={{
        roles: ["admin"],
        permissions: ["user:create", "user:delete"],
      }}
      config={{
        admin: ["*"],
        editor: ["post:create", "post:update"],
      }}
    >
      <Dashboard />
    </RoleGuardProvider>
  );
}

function Dashboard() {
  const canDelete = useCan("user:delete");

  return (
    <div>
      <Can role="admin">
        <AdminPanel />
      </Can>

      <Can permission="post:create">
        <CreatePostButton />
      </Can>

      <Can
        permissions={["order:edit", "order:cancel"]}
        match="any"
        fallback={<span>No access</span>}
      >
        <OrderActions />
      </Can>

      {canDelete && <DeleteUserButton />}
    </div>
  );
}
```

## 🧩 API Reference

### RoleGuardProvider

Global configuration and user context.

```tsx
<RoleGuardProvider
  user={{
    roles: ["admin", "editor"],
    permissions: ["user:create", "post:*"],
  }}
  config={{
    admin: ["*"],                    // Wildcard: all permissions
    editor: ["post:create", "post:update"],
    viewer: ["post:read"],
  }}
  features={{
    newDashboard: true,
    aiSearch: false,
  }}
>
  <App />
</RoleGuardProvider>
```

**Props:**
- `user?: User | null` - Current user with roles and permissions
- `config?: RoleGuardConfig` - Role-to-permission mappings and features

### `<Can />` Component

Declarative access control.

```tsx
// Single role
<Can role="admin">
  <AdminPanel />
</Can>

// Single permission
<Can permission="user:delete">
  <DeleteButton />
</Can>

// Multiple permissions (any)
<Can permissions={["post:create", "post:update"]}>
  <EditPost />
</Can>

// Multiple permissions (all required)
<Can permissions={["post:create", "post:publish"]} match="all">
  <PublishPost />
</Can>

// With fallback
<Can
  permission="admin:access"
  fallback={<AccessDenied />}
>
  <AdminSettings />
</Can>
```

**Props:**
- `role?: string` - Check if user has this role
- `permission?: string` - Check if user has this permission
- `permissions?: string[]` - Check multiple permissions
- `match?: "any" | "all"` - Match mode for multiple permissions (default: "any")
- `fallback?: ReactNode` - Render when access denied

### `useCan()` Hook

Programmatic access checks.

```tsx
function MyComponent() {
  const canEdit = useCan("post:update");
  const isAdmin = useCan({ role: "admin" });
  const canManageUsers = useCan({
    permissions: ["user:create", "user:delete"],
    match: "all"
  });

  if (!canEdit) return null;

  return <EditButton />;
}
```

**Parameters:**
```tsx
// Single role
useCan({ role: "admin" })

// Single permission
useCan({ permission: "user:delete" })

// Multiple permissions
useCan({
  permissions: ["post:create", "post:update"],
  match: "any" | "all"  // default: "any"
})
```

### `<Guard />` Component

Route protection (alias for `<Can />`).

```tsx
// React Router example
<Route
  path="/admin"
  element={
    <Guard role="admin" fallback={<Navigate to="/403" />}>
      <AdminPage />
    </Guard>
  }
/>
```

### `<Feature />` Component

Feature flag rendering.

```tsx
<Feature name="newDashboard">
  <DashboardV2 />
</Feature>

<Feature name="aiSearch" fallback={<BasicSearch />}>
  <AISearch />
</Feature>
```

## 🔑 Permission System

### Wildcard Permissions

```tsx
config={{
  admin: ["*"],           // All permissions
  manager: ["user:*"],    // All user-related permissions
  editor: ["post:*"],     // All post-related permissions
}}

user: {
  permissions: ["user:create", "post:*"]
}
```

### Permission Matching

- Exact match: `"user:delete"` matches `"user:delete"`
- Wildcard: `"*"` matches any permission
- Prefix wildcard: `"user:*"` matches `"user:create"`, `"user:delete"`, etc.

### Role Inheritance

Roles are mapped to permissions in the config:

```tsx
config={{
  admin: ["*"],
  editor: ["post:create", "post:update", "post:delete"],
  viewer: ["post:read"],
}}

user: {
  roles: ["editor"],  // Gets post:create, post:update, post:delete
}
```

## 🏗️ Architecture

```
User → Roles → Permissions → Access Decision → UI / Route
```

- **User**: Current user with roles and direct permissions
- **Roles**: Mapped to permission sets in config
- **Permissions**: Granular access controls
- **Features**: Optional feature flags

## 🔧 Advanced Usage

### Custom Context

```tsx
import { useRoleGuardContext } from "advanced-react-role-guard";

function CustomComponent() {
  const { hasRole, hasPermission, hasFeature } = useRoleGuardContext();

  // Direct access to context methods
  const canAccess = hasPermission("custom:action");

  return canAccess ? <CustomUI /> : null;
}
```

### TypeScript Types

```tsx
import type {
  User,
  RoleConfig,
  RoleGuardConfig,
  CanProps,
  UseCanParams
} from "advanced-react-role-guard";

// Strongly typed usage
const user: User = {
  roles: ["admin"],
  permissions: ["user:*"]
};
```

## 🎯 Use Cases

- **SaaS Dashboards** - Multi-tenant role management
- **CMS Systems** - Content creation permissions
- **E-commerce** - Order management access
- **Admin Panels** - Feature-restricted interfaces
- **Enterprise Apps** - Complex permission matrices

## 🤝 Framework Integration

### React Router

```tsx
import { Guard } from "advanced-react-role-guard";

<Route
  path="/admin/users"
  element={
    <Guard permission="user:manage" fallback={<Navigate to="/dashboard" />}>
      <UserManagement />
    </Guard>
  }
/>
```

### Next.js

Works seamlessly with Next.js SSR:

```tsx
// pages/admin.tsx
import { Guard } from "advanced-react-role-guard";

export default function AdminPage() {
  return (
    <Guard role="admin" fallback={<div>Access Denied</div>}>
      <AdminDashboard />
    </Guard>
  );
}
```

## 📦 Bundle Size

- **Core**: ~3.6KB gzipped
- **Full**: ~8KB gzipped (with all features)

## 🤝 Contributing

PRs welcome! Please include tests and update documentation.

## 📄 License

MIT © [Parsa Jiravand]

---

**Made with ❤️ for clean, secure React apps**