import { After, getSerializedData, ensureReady } from '@lomray/after';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CommonLayout from '@components/layouts/common/index.wrapper';
import { IS_PROD, IS_PWA } from '@constants/index';
import { AppProvider } from '@context/app';
import { StoreManagerProvider } from '@context/store-manager';
import { getStoresState } from '@helpers/serialized-store';
import ApiClient from '@services/api-client';
import Endpoints from '@store/endpoints';
import Manager from '@store/manager';
import routes from './routes';
import * as ServiceWorker from './sw-register';
import 'react-notifications-component/dist/theme.css';
import './assets/styles/global.scss';

const initialI18nStore = getSerializedData('initialI18nStore');
const initialLanguage = getSerializedData('initialLanguage', false);
const initServerState = getSerializedData('preloadedState', IS_PROD);
const initState = getStoresState();
const endpoints = new Endpoints(new ApiClient());

const storeManager = new Manager({ initState, initServerState, endpoints });

void ensureReady(routes).then((data) =>
  hydrate(
    <BrowserRouter>
      <StoreManagerProvider storeManager={storeManager}>
        <AppProvider initValue={data.initialData?.context?.app ?? {}}>
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
