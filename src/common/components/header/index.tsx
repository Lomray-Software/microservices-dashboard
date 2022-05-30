import { mdiBackburger } from '@mdi/js';
import Icon from '@mdi/react';
import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Notification } from '@assets/images/icons/notification-white.svg';
import type { StoreProps } from '@components/header/index.stores';
import Breadcrumbs from '@components/layout/breadcrumbs';
import Link from '@components/link';
import SideMenu from '@components/side-menu/index.wrapper';
import { APP_SHORT_NAME } from '@constants/index';
import ROUTES from '@constants/routes';
import combineCss from '@helpers/combine-css';
import User from './user/index.wrapper';
import styles from './styles.module.scss';

const Header: FC<StoreProps> = ({ appStore: { toggleSidebar, hasSidebar } }) => {
  const { t } = useTranslation('translation');

  return (
    <header className={styles.header}>
      <Breadcrumbs />
      <button type="button" className={styles.button} onClick={toggleSidebar}>
        {[...Array(3)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span className={styles.line} key={i} />
        ))}
      </button>
      <Link to={ROUTES.HOME} className={styles.logo}>
        {APP_SHORT_NAME[0]}
      </Link>
      <button className={styles.navigationButton} type="button" onClick={toggleSidebar}>
        <Icon path={mdiBackburger} size={1.5} color="#6c7293" />
      </button>
      <label className={styles.wrapperSearch}>
        <input className={styles.input} type="text" placeholder={t('search')} />
      </label>
      <div className={styles.notification}>
        <Notification />
      </div>
      <User />
      <div
        className={combineCss(
          styles.wrapperNavigation,
          hasSidebar ? styles.wrapperNavigationOpen : '',
        )}>
        <SideMenu isMobile />
      </div>
    </header>
  );
};

export default Header;
