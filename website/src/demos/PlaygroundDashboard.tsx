import {
  Can,
  Feature,
  Guard,
  useCan,
  useRoleGuardContext,
} from 'advanced-react-role-guard';

function ContextDebug() {
  const { hasPermission, hasAllPermissions, user } = useRoleGuardContext();
  const keys = [
    'post:create',
    'post:update',
    'order:read',
    'order:update',
    'user:delete',
  ] as const;
  return (
    <details className="debug">
      <summary>Debug: context checks (hasPermission)</summary>
      <p className="muted small">
        User snapshot: <code>{JSON.stringify(user)}</code>
      </p>
      <ul className="debug-list">
        {keys.map((k) => (
          <li key={k}>
            {k}: <strong>{hasPermission(k) ? 'yes' : 'no'}</strong>
          </li>
        ))}
        <li>
          order:read + order:update (all):{' '}
          <strong>
            {hasAllPermissions(['order:read', 'order:update']) ? 'yes' : 'no'}
          </strong>
        </li>
      </ul>
    </details>
  );
}

export function PlaygroundDashboard() {
  const canDeleteUsers = useCan({ permission: 'user:delete' });
  const isAdmin = useCan({ role: 'admin' });
  const canManagePosts = useCan({
    permissions: ['post:create', 'post:update'],
    match: 'any',
  });

  return (
    <div className="demo-sections">
      <section className="card">
        <h2>Can — role</h2>
        <Can role="admin">
          <div className="ok">Admin panel (visible for admin preset)</div>
        </Can>
      </section>

      <section className="card">
        <h2>Can — permission</h2>
        <Can permission="user:create">
          <button type="button">Create user</button>
        </Can>
      </section>

      <section className="card">
        <h2>Can — permissions + match any</h2>
        <Can
          permissions={['post:create', 'post:update']}
          match="any"
          fallback={<div className="muted">Need post:create or post:update</div>}
        >
          <div className="ok">Post editor</div>
        </Can>
      </section>

      <section className="card">
        <h2>Can — permissions + match all</h2>
        <Can
          permissions={['user:create', 'user:delete', 'user:update']}
          match="all"
          fallback={<div className="muted">Need all user:* CRUD permissions</div>}
        >
          <div className="ok">User manager</div>
        </Can>
      </section>

      <section className="card">
        <h2>Feature</h2>
        <Feature name="newDashboard">
          <div className="ok">New dashboard (flag on)</div>
        </Feature>
        <Feature name="aiSearch" fallback={<input placeholder="Basic search" />}>
          <input placeholder="AI search" />
        </Feature>
      </section>

      <section className="card">
        <h2>useCan (imperative)</h2>
        <ul className="checks">
          <li>
            user:delete:{' '}
            <strong>{canDeleteUsers ? 'yes' : 'no'}</strong>
          </li>
          <li>
            role admin: <strong>{isAdmin ? 'yes' : 'no'}</strong>
          </li>
          <li>
            post create/update (any):{' '}
            <strong>{canManagePosts ? 'yes' : 'no'}</strong>
          </li>
        </ul>
        {canDeleteUsers ? <button type="button">Delete user</button> : null}
        {isAdmin ? <div className="ok">System settings</div> : null}
        {canManagePosts ? <div className="ok">Bulk post actions</div> : null}
      </section>

      <section className="card">
        <h2>Guard (route-style)</h2>
        <Guard role="admin" fallback={<div className="warn">Not an admin route</div>}>
          <div className="ok">Admin-only block</div>
        </Guard>
        <Guard
          permissions={['order:read', 'order:update']}
          match="all"
          fallback={<div className="warn">Need order:read and order:update</div>}
        >
          <div className="ok">Order management</div>
        </Guard>
      </section>

      <ContextDebug />
    </div>
  );
}
