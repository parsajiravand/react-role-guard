# Troubleshooting

## `useRoleGuardContext must be used within a RoleGuardProvider`

**Cause:** A component calling `useCan`, `Feature`, or `useRoleGuardContext` is **outside** the provider tree.

**Fix:** Wrap your app (or subtree) with `RoleGuardProvider`:

```tsx
<RoleGuardProvider user={user} config={config}>
  <YourApp />
</RoleGuardProvider>
```

## Permission always `false`

1. Confirm **`user.roles`** and **`config.roles`** line up (same role names).
2. Check **exact** permission strings vs typos.
3. Remember **direct vs role** wildcard rules ([Permissions model](/guide/permissions-model)).
4. For multiple permissions, verify **`match`** (`any` vs `all`).

## Hydration mismatch (Next.js)

**Cause:** `user` or `config` differs between server render and first client render.

**Fix:** Pass a **stable** default on the server, then update after client-only session load in `useEffect`, or fetch session in a client-only boundary.

## TypeScript errors on `Can` / `Guard`

Props use unions: you typically pass **one** of `role`, `permission`, or `permissions`. If you build props dynamically, **narrow** the type or use a typed helper.

## Build / docs

- Run `npm run docs:build` from the repo root to validate the documentation site.
- Broken internal links: use paths like `/guide/getting-started` (leading slash).
