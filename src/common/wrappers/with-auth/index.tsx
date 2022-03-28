import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { ComponentType } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import AuthGateway from '@components/auth-gateway/index.wrapper';

/**
 * HOC - add auth to component
 */
const withAuth = (
  HocComponent: ComponentType,
  isOnlyGuest = false,
): ComponentType<RouteComponentProps> => {
  const Wrapper = (props: RouteComponentProps) => (
    <AuthGateway isOnlyGuest={isOnlyGuest} {...props}>
      <HocComponent />
    </AuthGateway>
  );

  hoistNonReactStatics(Wrapper, HocComponent);
  Wrapper.displayName = `(${HocComponent.displayName || ''})withAuth`;

  return Wrapper;
};

export default withAuth;
