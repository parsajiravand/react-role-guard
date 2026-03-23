# FAQ

## What is the difference between `Can` and `Guard`?

They **behave the same** in code. Use **`Can`** for inline UI and **`Guard`** when you think of “route or page” protection. See [Route protection](/guide/route-protection).

## Why does `useCan` return `false` when I pass a string?

The hook only accepts an **object**: `{ role: '…' }`, `{ permission: '…' }`, or `{ permissions: [...], match? }`. String arguments are invalid and will not type-check.

## Do `user.permissions` support `resource:*` wildcards?

**Prefix patterns** (`post:*`, `user:*`) are evaluated for permission strings listed under **`config.roles`** for the user’s roles. Direct `user.permissions` uses **exact** strings plus literal `'*'` for “global allow.” See [Permissions model](/guide/permissions-model).

## How do feature flags relate to permissions?

- **Permissions** — `hasPermission` / `Can` / `Guard` / `useCan`.
- **Features** — `config.features` and the **`Feature`** component.

They are **separate**; you can combine both in one tree.

## Is this library safe for SSR?

Yes, if you **use client components** (or equivalent) where context hooks run, and you avoid hydration mismatches by keeping provider props consistent. **Security is still enforced on the server** — see [Security](/security).

## Which React versions are supported?

**React 19 and later.** Peer dependencies are `react` and `react-dom` ≥ 19.0.0. Development and testing target current React 19+ releases.

## Will there be breaking changes in v2?

This library follows semver. When v2 is published, expect a migration note in the changelog and, if needed, codemods or a short compatibility table. Until then, follow the public API in the [API reference](/api/role-guard-provider).
