# Security

**advanced-react-role-guard** helps you build **consistent UI** around roles, permissions, and feature flags. It does **not** replace **server-side authorization**.

## Threat model (library boundary)

| Concern | Reality |
|---------|---------|
| **Client bundle** | Users can inspect JavaScript and props. Any `user`, `config`, or flag you pass to `RoleGuardProvider` is not secret. |
| **UI hiding** | `Can`, `Guard`, and `Feature` only **hide or show** elements. They do not stop crafted API calls. |
| **Feature flags** | Treat as **UX toggles**, not security boundaries. |

## When to use this page

- Architecture reviews
- Onboarding engineers who might confuse “hidden button” with “secured action”

## Recommended practices

- **Authorize every API** request on the server (session, JWT claims, policy engine).
- Treat frontend permission checks as **defense in depth for UX** only.
- Keep **sensitive operations** behind server checks even if the UI never exposes them.
- Rotate and validate **tokens** independently of this library.

## Pitfalls

- Assuming **`Guard`** blocks navigation in a way that secures data — it only affects what React renders.

## Example (correct layering)

```text
Browser: RoleGuardProvider + Can  →  nice UX
   ↓
API: verify role/permission on each request  →  real security
```

## Migration / future versions

If future releases add helpers (e.g. policy builders), **security rules stay on the server** — watch the [Changelog](/changelog) for semver notes.
