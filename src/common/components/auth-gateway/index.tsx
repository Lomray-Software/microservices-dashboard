import { Redirect } from '@lomray/after';
import type { FC, ReactElement } from 'react';
import React from 'react';
import ROUTE from '@constants/routes';
import type { StoreProps } from './index.stores';

interface IAuthGateway {
  children: ReactElement;
  isOnlyGuest?: boolean;
  location: Location;
}

type Props = IAuthGateway & StoreProps;

/**
 * Component for implementation secure feature.
 * Protect some pages with authentication.
 */
const AuthGateway: FC<Props> = ({
  userStore: { isAuth },
  appStore: { isLoading },
  children,
  location,
  isOnlyGuest = false,
}) => {
  const { pathname, search } = location;
  const searchParams = new URLSearchParams(search);

  /**
   * If you need show components only for guest
   */
  if (isOnlyGuest) {
    if (isAuth && !isLoading) {
      return <Redirect to={decodeURI(searchParams.get('from') || ROUTE.HOME.URL)} />;
    }

    return children;
  }

  /**
   * Redirect to sign in page if user is not authenticated
   */
  if (!isAuth) {
    return (
      (!isLoading && (
        <Redirect to={`${ROUTE.SIGN_IN.URL}?from=${encodeURI(pathname || ROUTE.HOME.URL)}`} />
      )) ||
      null
    );
  }

  return children;
};

export default AuthGateway;
