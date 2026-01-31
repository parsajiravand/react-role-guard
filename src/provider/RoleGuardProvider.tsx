import React from 'react';
import RoleGuardContext, { createRoleGuardContextValue } from '../context/roleContext';
import { RoleGuardProviderProps } from '../types';

export const RoleGuardProvider: React.FC<RoleGuardProviderProps> = ({
  user = null,
  config = {},
  children,
}) => {
  const contextValue = React.useMemo(
    () => createRoleGuardContextValue(user, config),
    [user, config]
  );

  return (
    <RoleGuardContext.Provider value={contextValue}>
      {children}
    </RoleGuardContext.Provider>
  );
};