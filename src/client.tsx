import { After, getSerializedData, ensureReady } from '@jaredpalmer/after';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from '@components/layout';
import { IS_PROD, IS_PWA } from '@constants/index';
import { AppProvider } from '@context/app';
import { StoreManagerProvider } from '@context/store-manager';
import Manager from '@store/manager';
import routes from './routes';
import * as ServiceWorker from './sw-register';
import './assets/styles/global.scss';

const initialI18nStore = getSerializedData('initialI18nStore');
const initialLanguage = getSerializedData('initialLanguage', false);
const initServerState = getSerializedData('preloadedState', IS_PROD);
const initState = localStorage.getItem(Manager.localStorageKey) || {};

const storeManager = new Manager({ initState, initServerState });

void ensureReady(routes).then((data) =>
  hydrate(
    <BrowserRouter>
      <StoreManagerProvider storeManager={storeManager}>
        <AppProvider initValue={data.initialData?.context?.app ?? {}}>
          <Layout initialI18nStore={initialI18nStore} initialLanguage={initialLanguage}>
            <After
              data={data}
              routes={routes}
              storeManager={storeManager}
              transitionBehavior="blocking"
            />
          </Layout>
        </AppProvider>
      </StoreManagerProvider>
    </BrowserRouter>,
    document.getElementById('root'),
  ),
);

if (module.hot) {
  module.hot.accept();
}

if (IS_PWA && IS_PROD) {
  ServiceWorker.register();
} else {
  ServiceWorker.unregister();
}
