import type { RoleGuardContextValue, UseCanParams } from '../types';

/** Shape `<Can>` / `<Guard>` pass into `useCan` (every prop key may exist). */
type CanLikeParams = {
  role?: string;
  permission?: string;
  permissions?: string[];
  match?: 'any' | 'all';
};

/**
 * Shared by `useCan` and tests. `<Can>` / `<Guard>` may pass all prop keys with
 * `undefined` values; branch on real permission data, not `'role' in params`.
 */
export function resolveCanAccess(
  params: UseCanParams | CanLikeParams,
  ctx: Pick<
    RoleGuardContextValue,
    'hasRole' | 'hasPermission' | 'hasAnyPermission' | 'hasAllPermissions'
  >
): boolean {
  const permissions = (params as CanLikeParams).permissions;
  if (Array.isArray(permissions) && permissions.length > 0) {
    const match = (params as CanLikeParams).match ?? 'any';
    return match === 'any'
      ? ctx.hasAnyPermission(permissions)
      : ctx.hasAllPermissions(permissions);
  }

  const p = params as CanLikeParams;
  if (p.permission) {
    return ctx.hasPermission(p.permission);
  }

  if (p.role) {
    return ctx.hasRole(p.role);
  }

  return false;
}
