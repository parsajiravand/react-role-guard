import { describe, expect, it } from 'vitest';
import { createRoleGuardContextValue } from './roleContext';

describe('createRoleGuardContextValue', () => {
  it('grants role-based permissions when user.permissions is omitted', () => {
    const { hasPermission, hasAllPermissions } = createRoleGuardContextValue(
      { roles: ['editor'] },
      {
        roles: {
          editor: ['post:*', 'order:read', 'order:update'],
        },
      }
    );
    expect(hasPermission('post:create')).toBe(true);
    expect(hasAllPermissions(['order:read', 'order:update'])).toBe(true);
  });

  it('grants admin * from roles when permissions is omitted', () => {
    const { hasPermission } = createRoleGuardContextValue(
      { roles: ['admin'] },
      {
        roles: { admin: ['*'] },
      }
    );
    expect(hasPermission('post:create')).toBe(true);
  });

  it('still checks direct user.permissions when present', () => {
    const { hasPermission } = createRoleGuardContextValue(
      { roles: ['viewer'], permissions: ['audit:view'] },
      { roles: { viewer: ['post:read'] } }
    );
    expect(hasPermission('audit:view')).toBe(true);
  });
});
