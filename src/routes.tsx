import { asyncComponent, AsyncRouteableComponent } from '@jaredpalmer/after';
import React from 'react';
import { RouteProps } from 'react-router';
import Loader from '@components/loader';
import { APP_OTHER_LANGUAGES, IS_TRANSLATE } from '@constants/index';
import ROUTES from '@constants/routes';
import {
  asyncRouteComponentWrapper,
  routeComponentWrapper,
} from '@helpers/route-component-wrapper';
import NotFound from '@pages/not-found';

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
      loader: () => import('@pages/home/index.store'),
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
    route.component = asyncRouteComponentWrapper(route.component as AsyncRouteComponent);
  } else {
    route.component = routeComponentWrapper(route.component);
  }

  if (route.path) {
    route.path = Array.isArray(route.path) ? route.path : [route.path];

    // Create localized routes for each locale (just add new path with language prefix)
    if (IS_TRANSLATE) {
      route.path = route.path.reduce((res, path) => {
        const localizationPaths = APP_OTHER_LANGUAGES.map((locale) => `/${locale}${path}`);

        return [...res, ...localizationPaths];
      }, route.path);
    }
  }
});

export default routes;
