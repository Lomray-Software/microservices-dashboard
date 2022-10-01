import { After, getSerializedData, ensureReady } from '@lomray/after';
import type { ServerAppState } from '@lomray/after';
import { Manager, StoreManagerProvider, MobxLocalStorage } from '@lomray/react-mobx-manager';
import type { FC } from 'react';
import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CommonLayout from '@components/layouts/common/index.wrapper';
import Spinner from '@components/loaders/spinner';
import { IS_PROD, IS_PWA, IS_SPA } from '@constants/index';
import { AppProvider } from '@context/app';
import initApi from '@services/api-client';
import routes from './routes';
import * as ServiceWorker from './sw-register';
import './assets/styles/global.scss';

const initialI18nStore = getSerializedData('initialI18nStore');
const initialLanguage = getSerializedData('initialLanguage', false);
const initState = getSerializedData('preloadedState', IS_PROD);

const { endpoints, apiClient } = initApi();

const storeManager = new Manager({
  initState,
  storage: new MobxLocalStorage(),
  storesParams: { endpoints },
  options: { isSSR: true },
});

apiClient.setStoreManager(storeManager);

/**
 * Application
 * @constructor
 */
const App: FC<{ data: ServerAppState }> = ({ data }) => (
  <BrowserRouter>
    <StoreManagerProvider storeManager={storeManager} fallback={<Spinner />} shouldInit>
      <AppProvider>
        <CommonLayout initialI18nStore={initialI18nStore} initialLanguage={initialLanguage}>
          <After
            data={data}
            routes={routes}
            storeManager={storeManager}
            transitionBehavior="blocking"
          />
        </CommonLayout>
      </AppProvider>
    </StoreManagerProvider>
  </BrowserRouter>
);

// Start application
void ensureReady(routes).then((data) => {
  const container = document.getElementById('root') as HTMLElement;

  if (IS_SPA) {
    const root = createRoot(container);

    root.render(<App data={data} />);
  } else {
    hydrateRoot(container, <App data={data} />);
  }
});

if (IS_PWA && IS_PROD) {
  ServiceWorker.register();
} else {
  ServiceWorker.unregister();
}
