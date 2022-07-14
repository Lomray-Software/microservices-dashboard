import type { AsyncRouteProps } from '@lomray/after';
import type { ComponentType } from 'react';
import type { IRoute } from '@interfaces/i-route';
import { asyncRouteComponent, routeComponent } from '@wrappers/route';
import withAuth from '@wrappers/with-auth';

/**
 * Apply modifications and return routes for react router dom
 */
const buildRoutes = (baseRoutes?: IRoute[], parentPath?: string): AsyncRouteProps[] | undefined =>
  baseRoutes?.map((route) => {
    const { isPublic = false, isOnlyGuest = false, element, children, path, ...rest } = route;

    let wrappedElement;

    if (element.hasOwnProperty('getChunkName')) {
      // Attach async component wrapper
      // @ts-ignore
      wrappedElement = asyncRouteComponent(element);
    } else {
      // @ts-ignore
      wrappedElement = routeComponent(element);
    }

    return {
      ...rest,
      path: parentPath && path ? path.replace(parentPath, '') : path,
      children: buildRoutes(children, path),
      element:
        (!isPublic || isOnlyGuest) && !parentPath
          ? withAuth(wrappedElement as ComponentType, isOnlyGuest)
          : wrappedElement,
    };
  });

export default buildRoutes;
