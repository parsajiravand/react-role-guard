import type { RoleGuardConfig, User } from 'advanced-react-role-guard';

export type PresetKey = 'admin' | 'editor' | 'viewer';

export interface Preset {
  label: string;
  user: User;
  config: RoleGuardConfig;
}

/** Demo data: wildcards (`*`, `post:*`) live under `config.roles`, not as magic strings in `user.permissions`. */
export const PRESETS: Record<PresetKey, Preset> = {
  admin: {
    label: 'Admin (role has *)',
    user: { roles: ['admin'], permissions: [] },
    config: {
      roles: {
        admin: ['*'],
        editor: ['post:create', 'post:update', 'post:delete'],
        viewer: ['post:read'],
      },
      features: {
        newDashboard: true,
        aiSearch: false,
        betaFeatures: true,
      },
    },
  },
  editor: {
    label: 'Editor (post:* + orders + user CRUD)',
    user: {
      roles: ['editor'],
      permissions: ['user:create', 'order:read'],
    },
    config: {
      roles: {
        admin: ['*'],
        editor: [
          'post:*',
          'order:read',
          'order:update',
          'user:create',
          'user:delete',
          'user:update',
        ],
        viewer: ['post:read'],
      },
      features: {
        newDashboard: true,
        aiSearch: false,
        betaFeatures: true,
      },
    },
  },
  viewer: {
    label: 'Viewer (read-only)',
    user: { roles: ['viewer'], permissions: [] },
    config: {
      roles: {
        admin: ['*'],
        editor: ['post:create', 'post:update', 'post:delete'],
        viewer: ['post:read'],
      },
      features: {
        newDashboard: false,
        aiSearch: false,
        betaFeatures: false,
      },
    },
  },
};
