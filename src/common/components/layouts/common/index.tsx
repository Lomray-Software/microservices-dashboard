import type { Resource } from 'i18next';
import React, { useEffect } from 'react';
import { useSSR } from 'react-i18next';
import { ReactNotifications } from 'react-notifications-component';
import LoadingBar from '@components/loading-bar';
import ScrollRestoration from '@components/scroll-restoration';
import { useAppContext } from '@context/app';
import type { SSRLayoutComponent } from '@interfaces/ssr-component';
import '@services/localization';
import type { StoreProps } from './index.stores';

interface ILayout {
  initialI18nStore: Resource;
  initialLanguage: string;
}

type Props = ILayout & StoreProps;

const Common: SSRLayoutComponent<Props> = ({
  children,
  initialI18nStore,
  initialLanguage,
  appStore: { addSubscribers },
}) => {
  useSSR(initialI18nStore, initialLanguage);

  const { hasLoadingBar } = useAppContext();

  /**
   * Add app subscribers
   */
  useEffect(() => addSubscribers(), [addSubscribers]);

  return (
    <>
      {hasLoadingBar && <LoadingBar />}
      <ReactNotifications />
      <ScrollRestoration />
      {children}
    </>
  );
};

export default Common;
