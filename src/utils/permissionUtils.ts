import { Permission } from '../types';

/**
 * Check if a permission matches a pattern with wildcards
 */
export const matchesPermission = (permission: Permission, pattern: Permission): boolean => {
  if (pattern === '*') return true;
  if (pattern.endsWith(':*')) {
    const prefix = pattern.slice(0, -1); // Remove :*
    return permission.startsWith(prefix);
  }
  return permission === pattern;
};

/**
 * Check if a permission is granted based on a list of allowed permissions
 */
export const isPermissionGranted = (permission: Permission, allowedPermissions: Permission[]): boolean => {
  return allowedPermissions.some(allowed => matchesPermission(permission, allowed));
};