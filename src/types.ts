export type Role = string;
export type Permission = string;

export interface User {
  roles?: Role[];
  permissions?: Permission[];
}

export interface RoleConfig {
  [role: string]: Permission[];
}

export interface Features {
  [featureName: string]: boolean;
}

export interface RoleGuardConfig {
  roles?: RoleConfig;
  features?: Features;
}

export interface RoleGuardContextValue {
  user: User | null;
  config: RoleGuardConfig;
  hasRole: (role: Role) => boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasFeature: (featureName: string) => boolean;
}

export interface CanProps {
  role?: Role;
  permission?: Permission;
  permissions?: Permission[];
  match?: 'any' | 'all';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export interface GuardProps {
  role?: Role;
  permission?: Permission;
  permissions?: Permission[];
  match?: 'any' | 'all';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export interface FeatureProps {
  name: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export interface RoleGuardProviderProps {
  user?: User | null;
  config?: RoleGuardConfig;
  children: React.ReactNode;
}

export type UseCanParams =
  | { role: Role }
  | { permission: Permission }
  | { permissions: Permission[]; match?: 'any' | 'all' };

export type UseCanReturn = boolean;