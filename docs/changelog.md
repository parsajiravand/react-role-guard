# Changelog

All notable changes to **advanced-react-role-guard** are documented here. The project follows [Semantic Versioning](https://semver.org/).

## 1.0.1

- **Fix:** `hasPermission` now evaluates `config.roles` when `user.permissions` is omitted. Previously, a missing `permissions` field caused an early `false` before role-based grants (including `*` and `resource:*` on role lists).

## 1.0.0

- Initial stable release of `RoleGuardProvider`, `Can`, `Guard`, `Feature`, and `useCan`.
- Wildcard support: `*` and `prefix:*` on role permission lists; direct `user.permissions` supports exact strings and literal `*`.
- Feature flags via `config.features` and the `Feature` component.
- Exported types and `useRoleGuardContext` for advanced integrations.
