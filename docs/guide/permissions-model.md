# Permissions model

How **roles**, **direct permissions**, **wildcard** strings, and **`match`** interact at runtime.

## When to use

- Designing your `RoleGuardConfig` and API payloads
- Debugging “why does this permission return false?”

## Concepts

### User

`user` may include:

- `roles?: string[]` — role names (e.g. `admin`, `editor`).
- `permissions?: string[]` — **direct** permission strings from your backend.

### Role-to-permission mapping

`config.roles` maps each **role name** to a list of permission strings (and wildcards) that members of that role receive:

```ts
config: {
  roles: {
    admin: ['*'],
    editor: ['post:create', 'post:update', 'post:*'],
    viewer: ['post:read'],
  },
}
```

For each permission check, the library merges logic: direct user permissions, global `*`, and permissions implied by the user’s roles (including wildcards on **role** lists).

### Direct permissions vs role-derived

| Source | What counts |
|--------|-------------|
| `user.permissions` | Exact string match; plus literal `'*'` grants everything. |
| `config.roles[user.roles[i]]` | Exact match; role-level `'*'`; patterns ending with `:*` match any permission whose string **starts with** the same prefix (e.g. `user:` matches `user:read`, `user:write`). |

**Important:** For `user.permissions`, the implementation checks **exact** `includes` and literal `'*'`. It does **not** expand `post:*`-style entries in the user’s direct permission array the same way as for role lists. Prefer putting prefix wildcards under `config.roles` or grant exact strings from the API.

### Wildcards

- **`*`** — When present on the user’s permission list or on a role’s list, it grants **all** permissions checked by `hasPermission`.
- **`prefix:*`** (e.g. `user:*`) — Evaluated for permissions listed under **`config.roles`** for the user’s roles. Any permission string starting with `prefix` (e.g. `user:read` starts with `user:`) satisfies the pattern.

### `match: "any" | "all"`

Used when you pass **multiple** permissions to `Can`, `Guard`, or `useCan`:

- **`any`** (default) — User must satisfy **at least one** permission in the list.
- **`all`** — User must satisfy **every** permission in the list.

```tsx
<Can
  permissions={['billing:view', 'billing:export']}
  match="all"
  fallback={<p>Need view and export</p>}
>
  <ExportBilling />
</Can>
```

```tsx
const ok = useCan({
  permissions: ['doc:read', 'doc:share'],
  match: 'any',
});
```

## Example

```tsx
<RoleGuardProvider
  user={{
    roles: ['editor'],
    permissions: ['audit:view'],
  }}
  config={{
    roles: {
      editor: ['post:*', 'comment:moderate'],
      support: ['user:read'],
    },
  }}
>
  {/* editor gets post:create via post:* from role */}
  <Can permission="post:create">…</Can>
  {/* direct permission */}
  <Can permission="audit:view">…</Can>
</RoleGuardProvider>
```

## Pitfalls

- **`useCan` only accepts object arguments** — `{ permission }`, `{ role }`, or `{ permissions, match? }`.
- **Feature flags** are separate: they live in `config.features` and are toggled with the `Feature` component, not `hasPermission`.

## Best practices

- Use **stable permission strings** (`resource:action`) across frontend and backend.
- Keep **wildcards** in role templates; keep **user.permissions** for overrides the API sends explicitly.

## Common mistakes

- Assuming `user.permissions: ['post:*']` behaves like role-level `post:*` — **direct list uses exact match** (and `*`), not prefix expansion for `resource:*` patterns.
