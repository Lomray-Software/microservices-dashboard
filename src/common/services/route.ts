import Route from '@lomray/client-helpers-react/services/route';
import type React from 'react';
import ROUTE from '@constants/routes';
import withAuth from '@wrappers/with-auth';

const route = new Route({
  routes: ROUTE,
  onAuthGateway: (element, isOnlyGuest) =>
    // @ts-ignore
    withAuth(element, isOnlyGuest) as unknown as React.ReactNode,
});

export default route;
