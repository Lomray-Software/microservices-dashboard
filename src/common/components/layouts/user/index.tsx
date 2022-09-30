import ApiClient from '@lomray/microservices-client-api/api-client';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@components/footer';
import Header from '@components/header/index.wrapper';
import SideMenu from '@components/side-menu/index.wrapper';
import { IS_CLIENT, IS_PROD, IS_SERVER } from '@constants/index';
import InitialProps from '@helpers/initial-props';
import type { SSRComponent } from '@interfaces/ssr-component';
import type { StoreProps } from './index.stores';
import stores from './index.stores';
import styles from './styles.module.scss';

type Props = StoreProps;

const User: SSRComponent<Props> = () => (
  <div className={styles.wrapper}>
    <SideMenu />
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

let hasUserRefreshed = false;

User.getInitialProps = InitialProps(async ({ userStore }, ctx) => {
  if (
    // SSR
    (IS_SERVER && ctx.req?.universalCookies?.get('jwt-access')) ||
    // SPA
    (IS_CLIENT && IS_PROD && ApiClient.getRefreshTokenPayload()?.userId)
  ) {
    if (hasUserRefreshed) {
      return;
    }

    await userStore.refresh();
    hasUserRefreshed = true;
  }
}, stores) as never;

export default User;
