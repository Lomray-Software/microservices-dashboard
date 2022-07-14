import type { AsyncRouteProps } from '@lomray/after';
import { asyncComponent } from '@lomray/after';
import React from 'react';
import Loader from '@components/loaders/main-loader';
import ROUTE from '@constants/routes';
import buildRoutes from '@helpers/build-routes';

const asyncRouteProps = {
  Placeholder: () => <Loader />,
};

/**
 * For add public links:
 * @see TMenuLinks
 */
const routes = buildRoutes([
  {
    path: '/',
    element: asyncComponent({
      loader: () => import('@components/layouts/user/index.wrapper'),
      ...asyncRouteProps,
    }),
    children: [
      {
        path: ROUTE.HOME.URL,
        element: asyncComponent({
          loader: () => import('@pages/home/index.wrapper'),
          ...asyncRouteProps,
        }),
      },
      {
        path: ROUTE.USERS.URL,
        element: asyncComponent({
          loader: () => import('@pages/users/index.wrapper'),
          ...asyncRouteProps,
        }),
      },
      {
        path: ROUTE.USER.URL,
        element: asyncComponent({
          loader: () => import('@pages/user/index.wrapper'),
          ...asyncRouteProps,
        }),
      },
    ],
  },
  {
    path: ROUTE.SIGN_IN.URL,
    isOnlyGuest: true,
    element: asyncComponent({
      loader: () => import('@pages/login/index.wrapper'),
      ...asyncRouteProps,
    }),
  },
  {
    path: ROUTE.NOT_FOUND.URL,
    isPublic: true,
    element: asyncComponent({
      loader: () => import('@pages/not-found'),
      ...asyncRouteProps,
    }),
  },
]);

export default routes as AsyncRouteProps[];
