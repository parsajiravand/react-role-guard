# Changelog

All notable changes to **advanced-react-role-guard** are documented here. The project follows [Semantic Versioning](https://semver.org/).

## 1.0.0

- Initial stable release of `RoleGuardProvider`, `Can`, `Guard`, `Feature`, and `useCan`.
- Wildcard support: `*` and `prefix:*` on role permission lists; direct `user.permissions` supports exact strings and literal `*`.
- Feature flags via `config.features` and the `Feature` component.
- Exported types and `useRoleGuardContext` for advanced integrations.
