# Multi-role SaaS

**Multiple roles** on one account with overlapping permissions and stricter **`match="all"`** gates for sensitive actions.

## When to use

- Users can hold several roles (`owner`, `billing`, `member`)
- Billing actions require **more than one** permission

## Example

```tsx
import {
  RoleGuardProvider,
  Can,
  Guard,
} from 'advanced-react-role-guard';

type AppUser = {
  roles: string[];
  permissions: string[];
};

const user: AppUser = {
  roles: ['owner', 'member'],
  permissions: ['support:impersonate'],
};

const config = {
  roles: {
    owner: ['org:*', 'billing:*', 'member:invite'],
    billing: ['billing:view', 'billing:edit'],
    member: ['project:read'],
  },
};

export function App() {
  return (
    <RoleGuardProvider user={user} config={config}>
      <Workspace />
    </RoleGuardProvider>
  );
}

function Workspace() {
  return (
    <div>
      <Can role="owner">
        <p>Organization settings</p>
      </Can>

      <Guard
        permissions={['billing:view', 'billing:edit']}
        match="all"
        fallback={<p>Need full billing access</p>}
      >
        <button type="button">Update payment method</button>
      </Guard>

      <Can permission="member:invite" fallback={<span>Invite disabled</span>}>
        <button type="button">Invite member</button>
      </Can>
    </div>
  );
}
```

## Pitfalls

- **`org:*`**-style strings must appear under **`config.roles`** for prefix matching — align naming with [Permissions model](/guide/permissions-model).

## Best practices

- Map SaaS **plan entitlements** into `config.roles` or direct `user.permissions` from your billing service.
