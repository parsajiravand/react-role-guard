// Main components
export { RoleGuardProvider } from './provider/RoleGuardProvider';
export { Can } from './components/Can';
export { Guard } from './components/Guard';
export { Feature } from './components/Feature';

// Hooks
export { useCan } from './hooks/useCan';

// Context (for advanced use cases)
export { useRoleGuardContext } from './context/roleContext';

// Types
export type {
  User,
  Role,
  Permission,
  RoleConfig,
  Features,
  RoleGuardConfig,
  RoleGuardProviderProps,
  CanProps,
  GuardProps,
  FeatureProps,
  UseCanParams,
  UseCanReturn,
} from './types';