/* eslint-disable @typescript-eslint/unbound-method */
import { asyncComponent, InitialData } from '@jaredpalmer/after';
import type { History, Location } from 'history';
import pick from 'lodash.pick';
import React, { ComponentType, ReactElement, useContext, useEffect } from 'react';
import { match as MatchType } from 'react-router-dom';
import { IS_SPA } from '@constants/index';
import { AppContext, initAppContext, initState } from '@context/app';
import initSPA from '@helpers/init-spa';
import PageLoading from '@services/page-loading';
import ScrollRestoration from '@services/scroll-restoration';

type AsyncRouteComponentType = ReturnType<typeof asyncComponent>;

/**
 * For async route
 *
 * - Add page loading handler
 * - Add scroll page handler
 * - Add restore server app context
 * - Pass react-router 'match' to sagas
 */
const asyncRouteComponentWrapper = (
  AsyncRouteComponent: AsyncRouteComponentType,
): AsyncRouteComponentType => {
  // Copy original functions
  const { render, componentDidMount, componentWillUnmount } = AsyncRouteComponent.prototype;

  // attach app context
  AsyncRouteComponent.contextType = AppContext;

  /** only ssg mode **/
  // const defaultStaticInitialProps = AsyncRouteComponent.getStaticInitialProps;
  //
  // AsyncRouteComponent.getStaticInitialProps = (ctx) => {
  //   return defaultStaticInitialProps(ctx) as Promise<any>;
  // };
  /** only ssg mode **/

  AsyncRouteComponent.prototype.componentDidMount = function () {
    const { history, location, match, context } = this.props;

    initSPA({
      history,
      location,
      match,
      component: AsyncRouteComponent,
      setState: this.context.setState,
    });

    // detect pass context from getInitialProps
    if (context?.app) {
      this.context.setState(context.app);
    }

    componentDidMount.apply(this);
  };

  AsyncRouteComponent.prototype.componentWillUnmount = function () {
    // detect pass context from getInitialProps and reset to initial state
    if (this.props?.context?.app) {
      const restoredContext = pick(initState, Object.keys(this.props?.context?.app));

      this.context.setState(restoredContext);
    }

    componentWillUnmount?.apply(this);
  };

  AsyncRouteComponent.prototype.render = function () {
    const { Component: ComponentFromState } = this.state;

    if (ComponentFromState) {
      if (IS_SPA) {
        initAppContext(this.context.setState, this.props?.context);
      }

      PageLoading.setLoadingState(this.props.isLoading);
      ScrollRestoration.setLoadingState(this.props.isLoading);
    }

    return render.apply(this) as ReactElement | null;
  };

  return AsyncRouteComponent;
};

/**
 * For sync route
 *
 * - Add page loading handler
 * - Add scroll page handler
 * - Add restore server app context
 * - Pass react-router 'match' to sagas
 */
const routeComponentWrapper =
  (Component: ComponentType) =>
  ({
    match,
    isLoading,
    context,
    history,
    location,
  }: {
    isLoading: boolean;
    match: MatchType;
    history: History;
    location: Location;
  } & InitialData): ReactElement => {
    const ctx = useContext(AppContext);

    useEffect(() => {
      initSPA({ history, match, location, component: Component, setState: ctx.setState });
    }, [ctx.setState, history, location, match]);

    useEffect(() => {
      // detect pass context from getInitialProps
      initAppContext(ctx.setState, context);
    }, [context, ctx]);

    useEffect(() => {
      PageLoading.setLoadingState(isLoading);
      ScrollRestoration.setLoadingState(isLoading);
    });

    return <Component />;
  };

export { asyncRouteComponentWrapper, routeComponentWrapper };
