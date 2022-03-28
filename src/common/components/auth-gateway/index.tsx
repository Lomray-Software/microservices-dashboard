import React, { FC, ReactElement } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import ROUTES from '@constants/routes';
import type { StoreProps } from './index.stores';

interface IAuthGateway {
  children: ReactElement;
  isOnlyGuest?: boolean;
  isLoading?: boolean;
}

type Props = IAuthGateway & StoreProps & RouteComponentProps;

/**
 * Component for implementation secure feature.
 * Protect some pages with authentication.
 */
const AuthGateway: FC<Props> = ({
  userStore: { isAuth },
  children,
  location,
  isOnlyGuest = false,
  isLoading = false,
}) => {
  const { pathname, search } = location;
  const searchParams = new URLSearchParams(search);

  /**
   * If you need show components only for guest
   */
  if (isOnlyGuest) {
    if (isAuth && !isLoading) {
      return <Redirect to={decodeURI(searchParams.get('from') || ROUTES.HOME)} />;
    }

    return children;
  }

  /**
   * Redirect to sign in page if user is not authenticated
   */
  if (!isAuth) {
    return (
      (!isLoading && <Redirect to={`${ROUTES.SIGN_IN}?from=${encodeURI(pathname)}`} />) || null
    );
  }

  return children;
};

export default AuthGateway;
