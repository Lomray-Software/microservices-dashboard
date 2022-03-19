import { asyncComponent } from '@lomray/after';
import type { History, Location } from 'history';
import type { ComponentType } from 'react';
import type { match as MatchType } from 'react-router-dom';
import Layout from '@components/layout';
import { IS_PWA, IS_SPA } from '@constants/index';
import type { IAppContext } from '@context/app';

type AsyncRouteComponentType = ReturnType<typeof asyncComponent>;

/**
 * Init SPA app
 * Run getInitialProps for cache api (PWA or SSR)
 */
const initSPA = (() => {
  let hasSPAInit = false;

  return ({
    history,
    location,
    match,
    component,
    setState,
  }: {
    match: MatchType;
    history: History;
    location: Location;
    component: ComponentType | AsyncRouteComponentType;
    setState: IAppContext['setState'];
  }) => {
    if ((IS_SPA || IS_PWA) && !hasSPAInit) {
      // trigger getInitialProps for fetch app data from backend
      hasSPAInit = true;
      // @ts-ignore
      const ctx = { match, history, location };
      const fetchApi = async () => {
        // @ts-ignore
        const result = await component.getInitialProps?.(ctx);

        // detect pass context from getInitialProps and reset to initial state
        if (result?.context?.app) {
          setState(result.context.app);
        }

        // @ts-ignore
        Layout.getInitialProps?.({ ...ctx, data: { initialData: result } });
      };

      if (IS_PWA === 2 && 'serviceWorker' in navigator && !localStorage.getItem('initSW')) {
        // wait service worker install for cache api requests
        void navigator.serviceWorker.ready.then(() => {
          // set initSW to prevent waiting service worker ready in future
          localStorage.setItem('initSW', 'ok');
          // minimal delay for wait service worker registerRoute
          setTimeout(() => void fetchApi(), 100);
        });
      } else {
        void fetchApi();
      }
    }
  };
})();

export default initSPA;
