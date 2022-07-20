import { Manager } from '@lomray/react-mobx-manager';
import type { RouteObject } from 'react-router-dom';
import { matchRoutes } from 'react-router-dom';
import CommonLayout from '@components/layouts/common/index.wrapper';
import { IS_PWA, IS_SPA } from '@constants/index';
import routes from '../../routes';

/**
 *  - Init SPA app
 *  - Run getInitialProps for cache api (PWA or SSR)
 */
const initSPA = (() => {
  let hasSPAInit = false;

  return () => {
    if ((IS_SPA || IS_PWA) && !hasSPAInit) {
      // trigger getInitialProps for fetch app data from backend
      hasSPAInit = true;
      const { pathname } = location;
      const matchedRoutes = matchRoutes(routes as RouteObject[], pathname);
      const ctx = {
        match: matchedRoutes?.[matchedRoutes.length - 1] || null,
        storeManager: Manager.get(),
      };
      const fetchApi = () => {
        const promises = matchedRoutes?.map((match) => {
          const {
            route: { element },
          } = match;

          if (!element || !element['getInitialProps']) {
            return;
          }

          // @ts-ignore
          return element.getInitialProps(ctx) as Record<string, any>;
        });

        // @ts-ignore
        return Promise.all([...(promises || []), CommonLayout.getInitialProps?.({ ...ctx })]);
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
