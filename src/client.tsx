import { After, getSerializedData, ensureReady } from '@jaredpalmer/after';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from '@components/layout';
import { IS_PROD, IS_PWA } from '@constants/index';
import { AppProvider } from '@context/app';
import routes from './routes';
import * as ServiceWorker from './sw-register';
import './assets/styles/global.scss';

const initialI18nStore = getSerializedData('initialI18nStore');
const initialLanguage = getSerializedData('initialLanguage', false);

void ensureReady(routes).then((data) =>
  hydrate(
    <BrowserRouter>
      <AppProvider initValue={data.initialData?.context?.app ?? {}}>
        <Layout initialI18nStore={initialI18nStore} initialLanguage={initialLanguage}>
          <After data={data} routes={routes} transitionBehavior="blocking" />
        </Layout>
      </AppProvider>
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
