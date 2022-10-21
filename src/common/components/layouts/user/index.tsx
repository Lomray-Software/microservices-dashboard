import InitialProps from '@lomray/afterjs-helpers/helpers/initial-props';
import type { SSRComponent } from '@lomray/afterjs-helpers/interfaces/ssr-component';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@components/footer';
import Header from '@components/header/index.wrapper';
import SideMenu from '@components/side-menu/index.wrapper';
import { IS_CLIENT, IS_PROD, IS_SERVER } from '@constants/index';
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

InitialProps(
  async ({ userStore }, ctx) => {
    if (
      // SSR
      (IS_SERVER && ctx.req?.universalCookies?.get('jwt-access')) ||
      // SPA
      (IS_CLIENT && IS_PROD && (await userStore.hasRefreshToken()))
    ) {
      if (userStore.hasUserRefreshed) {
        return;
      }

      await userStore.refresh();
      userStore.setIsUserRefreshed(true);
    }
  },
  User,
  stores,
);

export default User;
