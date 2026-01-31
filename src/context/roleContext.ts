import React from 'react';
import { RoleGuardContextValue, User, RoleGuardConfig, Role, Permission } from '../types';

const RoleGuardContext = React.createContext<RoleGuardContextValue | undefined>(undefined);

export const useRoleGuardContext = (): RoleGuardContextValue => {
  const context = React.useContext(RoleGuardContext);
  if (!context) {
    throw new Error('useRoleGuardContext must be used within a RoleGuardProvider');
  }
  return context;
};

export const createRoleGuardContextValue = (
  user: User | null,
  config: RoleGuardConfig
): RoleGuardContextValue => {
  const hasRole = (role: Role): boolean => {
    if (!user?.roles) return false;
    return user.roles.includes(role);
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user?.permissions) return false;

    // Check direct permissions
    if (user.permissions.includes(permission)) return true;

    // Check wildcard permissions
    if (user.permissions.includes('*')) return true;

    // Check role-based permissions
    if (user.roles && config.roles) {
      for (const role of user.roles) {
        const rolePermissions = config.roles[role];
        if (rolePermissions) {
          if (rolePermissions.includes('*')) return true;
          if (rolePermissions.includes(permission)) return true;

          // Check wildcard patterns like "user:*"
          for (const rolePerm of rolePermissions) {
            if (rolePerm.endsWith(':*')) {
              const prefix = rolePerm.slice(0, -1); // Remove :*
              if (permission.startsWith(prefix)) return true;
            }
          }
        }
      }
    }

    return false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const hasFeature = (featureName: string): boolean => {
    return config.features?.[featureName] ?? false;
  };

  return {
    user,
    config,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasFeature,
  };
};

export default RoleGuardContext;