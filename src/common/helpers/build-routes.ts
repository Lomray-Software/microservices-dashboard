import type { AsyncRouteProps } from '@lomray/after';
import type { ComponentType } from 'react';
import type { IRoute } from '@interfaces/i-route';
import withAuth from '@wrappers/with-auth';

/**
 * Apply modifications and return routes for react router dom
 */
const buildRoutes = (baseRoutes?: IRoute[], isChildren = false): AsyncRouteProps[] | undefined =>
  baseRoutes?.map((route) => {
    const { isPublic = false, isOnlyGuest = false, element, children, path, ...rest } = route;

    return {
      ...rest,
      path,
      children: buildRoutes(children, true),
      element:
        (!isPublic || isOnlyGuest) && !isChildren
          ? withAuth(element as ComponentType, isOnlyGuest)
          : element,
    };
  });

export default buildRoutes;
