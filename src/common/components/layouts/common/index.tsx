import type { Resource } from 'i18next';
import React, { useEffect, Suspense } from 'react';
import { useSSR } from 'react-i18next';
import LoadingBar from '@components/loading-bar';
import ScrollRestoration from '@components/scroll-restoration';
import { useAppContext } from '@context/app';
import initSPA from '@helpers/init-spa';
import type { SSRLayoutComponent } from '@interfaces/ssr-component';
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
    initSPA();
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
