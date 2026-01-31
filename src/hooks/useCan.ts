import { useRoleGuardContext } from '../context/roleContext';
import { UseCanParams, UseCanReturn } from '../types';

export const useCan = (params: UseCanParams): UseCanReturn => {
  const { hasRole, hasPermission, hasAnyPermission, hasAllPermissions } = useRoleGuardContext();

  if ('role' in params) {
    return hasRole(params.role);
  }

  if ('permission' in params) {
    return hasPermission(params.permission);
  }

  if ('permissions' in params) {
    const { permissions, match = 'any' } = params;
    return match === 'any'
      ? hasAnyPermission(permissions)
      : hasAllPermissions(permissions);
  }

  return false;
};