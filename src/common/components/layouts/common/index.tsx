import LoadingBar from '@lomray/afterjs-helpers/components/loading-bar';
import ScrollRestoration from '@lomray/afterjs-helpers/components/scroll-restoration';
import initSPA from '@lomray/afterjs-helpers/helpers/init-spa';
import type { SSRLayoutComponent } from '@lomray/afterjs-helpers/interfaces/ssr-component';
import type { Resource } from 'i18next';
import React, { useEffect, Suspense } from 'react';
import { useSSR } from 'react-i18next';
import { IS_PWA, IS_SPA } from '@constants/index';
import { useAppContext } from '@context/app';
import routes from '../../../../routes';
import type { StoreProps } from './index.stores';
import '@services/localization';

const ReactNotifications = React.lazy(() =>
  import('@components/notifications').then((module) => ({
    default: module.ReactNotifications,
  })),
);

interface ICommon {
  initialI18nStore: Resource;
  initialLanguage: string;
}

type Props = ICommon & StoreProps;

const Common: SSRLayoutComponent<Props> = ({
  children,
  initialI18nStore,
  initialLanguage,
  appStore: { addSubscribers },
}) => {
  useSSR(initialI18nStore, initialLanguage);

  const { hasLoadingBar } = useAppContext();

  /**
   * Initialize spa app
   */
  useEffect(() => {
    initSPA({
      layout: Common,
      routes,
      isSpa: IS_SPA,
      isPwa: IS_PWA,
    });
  }, []);

  /**
   * Add app subscribers
   */
  useEffect(() => addSubscribers(), [addSubscribers]);

  return (
    <>
      {hasLoadingBar && <LoadingBar />}
      <Suspense>
        <ReactNotifications />
      </Suspense>
      <ScrollRestoration />
      {children}
    </>
  );
};

export default Common;
