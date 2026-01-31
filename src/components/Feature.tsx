import React from 'react';
import { FeatureProps } from '../types';
import { useRoleGuardContext } from '../context/roleContext';

export const Feature: React.FC<FeatureProps> = ({
  name,
  fallback = null,
  children,
}) => {
  const { hasFeature } = useRoleGuardContext();

  return hasFeature(name) ? <>{children}</> : <>{fallback}</>;
};