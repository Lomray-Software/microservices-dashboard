import Route from '@lomray/client-helpers-react/services/route';
import type React from 'react';
import ROUTE from '@constants/routes';
import { asyncRouteComponent, routeComponent } from '@wrappers/route';
import withAuth from '@wrappers/with-auth';

const route = new Route({
  routes: ROUTE,
  onBefore: (element) => {
    let wrappedElement: React.ReactNode;

    if ('getChunkName' in element) {
      // Attach async component wrapper
      // @ts-ignore
      wrappedElement = asyncRouteComponent(element);
    } else {
      // @ts-ignore
      wrappedElement = routeComponent(element);
    }

    return wrappedElement;
  },
  onAuthGateway: (element, isOnlyGuest) =>
    // @ts-ignore
    withAuth(element, isOnlyGuest) as unknown as React.ReactNode,
});

export default route;
