import { asyncComponent, AsyncRouteableComponent } from '@jaredpalmer/after';
import React from 'react';
import { RouteProps } from 'react-router';
import Loader from '@components/loader';
import ROUTES from '@constants/routes';
import NotFound from '@pages/not-found';
import { asyncRouteComponent, routeComponent } from '@wrappers/route';

type AsyncRouteComponent = ReturnType<typeof asyncComponent>;
type Route = Omit<RouteProps, 'component'> & {
  component: AsyncRouteComponent | AsyncRouteableComponent;
};

const asyncRouteProps = {
  Placeholder: () => <Loader />,
};

/**
 * For add public links:
 * @see TMenuLinks
 */
const routes = [
  {
    path: ROUTES.HOME,
    exact: true,
    component: asyncComponent({
      loader: () => import('@pages/home/index.wrapper'),
      ...asyncRouteProps,
    }),
  },
  {
    path: ROUTES.USERS,
    exact: true,
    component: asyncComponent({
      loader: () => import('@pages/users/index.wrapper'),
      ...asyncRouteProps,
    }),
  },
  {
    path: ROUTES.SIGN_IN,
    exact: true,
    component: asyncComponent({
      loader: () => import('@pages/login/index.wrapper'),
      ...asyncRouteProps,
    }),
  },
  {
    component: NotFound,
  },
];

routes.forEach((route: Route) => {
  if (route.component.hasOwnProperty('getInitialProps')) {
    // Attach async component wrapper
    route.component = asyncRouteComponent(route.component as AsyncRouteComponent);
  } else {
    route.component = routeComponent(route.component);
  }
});

export default routes;
