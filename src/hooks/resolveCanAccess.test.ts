import { describe, expect, it } from 'vitest';
import { resolveCanAccess } from './resolveCanAccess';

const ctx = {
  hasRole: (r: string) => r === 'admin',
  hasPermission: (p: string) => p === 'user:create',
  hasAnyPermission: (ps: string[]) => ps.some((p) => p === 'post:create'),
  hasAllPermissions: (ps: string[]) =>
    ps.every((p) => ['a', 'b'].includes(p)),
};

describe('resolveCanAccess', () => {
  it('does not treat undefined role as a role check (Can/Guard prop shape)', () => {
    expect(
      resolveCanAccess(
        { role: undefined, permission: 'user:create' },
        ctx
      )
    ).toBe(true);
  });

  it('checks permissions[] when role is undefined', () => {
    expect(
      resolveCanAccess(
        {
          role: undefined,
          permission: undefined,
          permissions: ['post:create', 'post:update'],
          match: 'any',
        },
        ctx
      )
    ).toBe(true);
  });

  it('still uses role when that is the only intent', () => {
    expect(resolveCanAccess({ role: 'admin' }, ctx)).toBe(true);
    expect(resolveCanAccess({ role: 'viewer' }, ctx)).toBe(false);
  });
});
