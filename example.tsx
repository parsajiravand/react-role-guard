import React from 'react';
import {
  RoleGuardProvider,
  Can,
  Guard,
  Feature,
  useCan
} from './src/index';

// Example usage of react-role-guard
function ExampleApp() {
  return (
    <RoleGuardProvider
      user={{
        roles: ['admin', 'editor'],
        permissions: ['user:create', 'post:*', 'order:read'],
      }}
      config={{
        admin: ['*'],
        editor: ['post:create', 'post:update', 'post:delete'],
        viewer: ['post:read'],
      }}
      features={{
        newDashboard: true,
        aiSearch: false,
        betaFeatures: true,
      }}
    >
      <Dashboard />
    </RoleGuardProvider>
  );
}

function Dashboard() {
  const canDeleteUsers = useCan('user:delete');
  const isAdmin = useCan({ role: 'admin' });
  const canManagePosts = useCan({
    permissions: ['post:create', 'post:update'],
    match: 'any'
  });

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Role-based rendering */}
      <Can role="admin">
        <AdminPanel />
      </Can>

      {/* Permission-based rendering */}
      <Can permission="user:create">
        <CreateUserButton />
      </Can>

      {/* Multiple permissions with any match */}
      <Can
        permissions={['post:create', 'post:update']}
        match="any"
        fallback={<div>You need post editing permissions</div>}
      >
        <PostEditor />
      </Can>

      {/* Multiple permissions with all match */}
      <Can
        permissions={['user:create', 'user:delete', 'user:update']}
        match="all"
      >
        <UserManager />
      </Can>

      {/* Feature flags */}
      <Feature name="newDashboard">
        <NewDashboard />
      </Feature>

      <Feature name="aiSearch" fallback={<BasicSearch />}>
        <AISearch />
      </Feature>

      {/* Programmatic checks */}
      {canDeleteUsers && <DeleteUserButton />}
      {isAdmin && <SystemSettings />}
      {canManagePosts && <BulkPostActions />}

      {/* Route protection example */}
      <RouteProtectionExample />
    </div>
  );
}

function AdminPanel() {
  return <div>🔧 Admin Panel - Only admins can see this</div>;
}

function CreateUserButton() {
  return <button>➕ Create User</button>;
}

function PostEditor() {
  return <div>📝 Post Editor - Requires post permissions</div>;
}

function UserManager() {
  return <div>👥 User Manager - Requires all user permissions</div>;
}

function NewDashboard() {
  return <div>🆕 New Dashboard - Feature flagged</div>;
}

function BasicSearch() {
  return <input placeholder="Search..." />;
}

function AISearch() {
  return <input placeholder="AI Search..." />;
}

function DeleteUserButton() {
  return <button>🗑️ Delete User</button>;
}

function SystemSettings() {
  return <div>⚙️ System Settings</div>;
}

function BulkPostActions() {
  return <div>📦 Bulk Post Actions</div>;
}

// Example of route protection
function RouteProtectionExample() {
  return (
    <div>
      <h2>Route Protection Examples</h2>

      {/* Using Guard component for route-like protection */}
      <Guard role="admin" fallback={<div>🚫 Access Denied</div>}>
        <div>🔒 Admin Route Content</div>
      </Guard>

      <Guard
        permissions={['order:read', 'order:update']}
        match="all"
        fallback={<div>🚫 Insufficient order permissions</div>}
      >
        <div>📋 Order Management</div>
      </Guard>
    </div>
  );
}

export default ExampleApp;