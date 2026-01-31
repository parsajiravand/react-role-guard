import React from 'react';
import { GuardProps } from '../types';
import { useCan } from '../hooks/useCan';

export const Guard: React.FC<GuardProps> = ({
  role,
  permission,
  permissions,
  match = 'any',
  fallback = null,
  children,
}) => {
  const hasAccess = useCan({
    role,
    permission,
    permissions,
    match,
  } as any); // Type assertion needed due to union type complexity

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};