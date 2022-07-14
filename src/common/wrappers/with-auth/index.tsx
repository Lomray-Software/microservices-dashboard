import type { IRouteProps } from '@lomray/after';
import hoistNonReactStatics from 'hoist-non-react-statics';
import type { ComponentType } from 'react';
import React from 'react';
import AuthGateway from '@components/auth-gateway/index.wrapper';

/**
 * HOC - add auth to component
 */
const withAuth = (HocComponent: ComponentType, isOnlyGuest: boolean): ComponentType => {
  const Wrapper = (props: IRouteProps) => {
    const { location } = props;

    return (
      <AuthGateway isOnlyGuest={isOnlyGuest} location={location}>
        <HocComponent {...props} />
      </AuthGateway>
    );
  };

  hoistNonReactStatics(Wrapper, HocComponent);
  Wrapper.displayName = `(${HocComponent.displayName || ''})withAuth`;

  return Wrapper;
};

export default withAuth;
