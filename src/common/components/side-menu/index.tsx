import Icon from '@mdi/react';
import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Link from '@components/link';
import { APP_SHORT_NAME } from '@constants/index';
import MENU from '@constants/menu';
import ROUTE from '@constants/routes';
import combineCss from '@helpers/combine-css';
import getActiveMenu from '@helpers/get-active-menu';
import type { StoreProps } from './index.stores';
import styles from './styles.module.scss';

interface ISideMenu {
  isMobile?: boolean;
}

/**
 * Side menu
 */
const SideMenu: FC<ISideMenu & StoreProps> = ({
  appStore: { hasSidebar },
  userStore: { isAuth },
  isMobile,
}) => {
  const { t } = useTranslation(['menu']);
  const { pathname } = useLocation();

  const activeMenuItem = getActiveMenu(pathname);

  if (!isAuth) {
    return null;
  }

  return (
    <nav
      className={combineCss(
        styles.navigation,
        hasSidebar ? styles.close : '',
        isMobile ? styles.mobile : '',
      )}
    >
      <Link to={ROUTE.HOME.URL} className={styles.title}>
        {!hasSidebar ? APP_SHORT_NAME : APP_SHORT_NAME[0]}
      </Link>
      <ul className={styles.list} aria-label={!hasSidebar ? t('menu:navTitle') : ''}>
        {Object.entries(MENU).map(
          ([
            link,
            {
              titleKey,
              icon: { color, src },
            },
          ]) => (
            <li key={link} className={styles.item}>
              <Link
                to={link}
                className={combineCss(
                  styles.link,
                  activeMenuItem.titleKey === titleKey ? styles.active : '',
                )}
              >
                <span className={styles.round}>
                  <Icon path={src} size={1} color={color} />
                </span>
                {isMobile ? t(`menu:${titleKey}`) : !hasSidebar && t(`menu:${titleKey}`)}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};

export default SideMenu;
