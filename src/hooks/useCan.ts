import { useRoleGuardContext } from '../context/roleContext';
import { UseCanParams, UseCanReturn } from '../types';
import { resolveCanAccess } from './resolveCanAccess';

export const useCan = (params: UseCanParams): UseCanReturn => {
  const ctx = useRoleGuardContext();
  return resolveCanAccess(params, ctx);
};
