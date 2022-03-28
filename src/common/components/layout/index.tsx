import React from 'react';
import { useSSR } from 'react-i18next';
import Footer from '@components/footer';
import Header from '@components/header/index.wrapper';
import LoadingBar from '@components/loading-bar';
import ScrollRestoration from '@components/scroll-restoration';
import { useAppContext } from '@context/app';
import InitialProps from '@helpers/initial-props';
import type { SSRLayoutComponent } from '@interfaces/ssr-component';
import '@services/localization';
import stores from './index.stores';

const Layout: SSRLayoutComponent = ({ children, initialI18nStore, initialLanguage }) => {
  useSSR(initialI18nStore, initialLanguage);

  const { hasLoadingBar, hasHeader, hasFooter } = useAppContext();

  return (
    <div className="Wrapper-layout">
      {hasLoadingBar && <LoadingBar />}
      <ScrollRestoration />
      {hasHeader && <Header />}
      {children}
      {hasFooter && <Footer />}
    </div>
  );
};

Layout.getInitialProps = InitialProps(async ({ userStore }, ctx) => {
  if (ctx.req?.universalCookies?.get('jwt-access')) {
    await userStore.refresh();
  }
}, stores) as never;

export default Layout;
