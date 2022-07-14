import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@components/footer';
import Header from '@components/header/index.wrapper';
import SideMenu from '@components/side-menu/index.wrapper';
import InitialProps from '@helpers/initial-props';
import type { SSRComponent } from '@interfaces/ssr-component';
import '@services/localization';
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

User.getInitialProps = InitialProps(async ({ userStore }, ctx) => {
  if (ctx.req?.universalCookies?.get('jwt-access')) {
    await userStore.refresh();
  }
}, stores) as never;

export default User;
