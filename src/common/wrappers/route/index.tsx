/* eslint-disable @typescript-eslint/unbound-method */
import type { asyncComponent, AsyncRouteableComponent, InitialData } from '@lomray/after';
import hoistNonReactStatics from 'hoist-non-react-statics';
import type { ComponentType, ReactElement } from 'react';
import React, { useEffect } from 'react';
import { IS_SPA } from '@constants/index';
import initSPA from '@helpers/init-spa';

type AsyncRouteComponentType = ReturnType<typeof asyncComponent>;

/**
 * For async route
 *
 * - Init SPA
 */
const asyncRouteComponent = (
  AsyncRouteComponent: AsyncRouteComponentType,
): AsyncRouteComponentType => {
  // Copy original functions
  const { render } = AsyncRouteComponent.prototype;

  /** only ssg mode **/
  // const defaultStaticInitialProps = AsyncRouteComponent.getStaticInitialProps;
  //
  // AsyncRouteComponent.getStaticInitialProps = (ctx) => {
  //   return defaultStaticInitialProps(ctx) as Promise<any>;
  // };
  /** only ssg mode **/

  AsyncRouteComponent.prototype.render = function () {
    const { Component: ComponentFromState } = this.state;

    if (ComponentFromState && IS_SPA) {
      initSPA();
    }

    return render.apply(this) as ReactElement | null;
  };

  return AsyncRouteComponent;
};

/**
 * For sync route
 *
 * - Init SPA
 */
const routeComponent = (Component: ComponentType<InitialData>) => {
  const RouteComponent = (props: InitialData): AsyncRouteableComponent => {
    useEffect(() => {
      initSPA();
    }, []);

    return <Component {...(props || {})} />;
  };

  hoistNonReactStatics(RouteComponent as ComponentType, Component);

  return RouteComponent;
};

export { asyncRouteComponent, routeComponent };
