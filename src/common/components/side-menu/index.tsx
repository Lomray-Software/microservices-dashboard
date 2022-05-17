import Icon from '@mdi/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Link from '@components/link';
import { StoreProps } from '@components/side-menu/index.stores';
import { APP_SHORT_NAME } from '@constants/index';
import MENU from '@constants/menu';
import ROUTES from '@constants/routes';
import combineCss from '@helpers/combine-css';
import getActiveMenu from '@helpers/get-active-menu';
import styles from './styles.module.scss';

interface ISideMenu {
  isMobile?: boolean;
}

/**
 * Side menu
 */
const SideMenu: FC<ISideMenu & StoreProps> = ({ appStore: { isNavigation }, isMobile }) => {
  const { t } = useTranslation(['menu']);
  const { pathname } = useLocation();

  const activeMenuItem = getActiveMenu(pathname);

  return (
    <nav
      className={combineCss(
        styles.navigation,
        isNavigation ? styles.close : '',
        isMobile ? styles.mobile : '',
      )}>
      <Link to={ROUTES.HOME} className={styles.title}>
        {!isNavigation ? APP_SHORT_NAME : APP_SHORT_NAME[0]}
      </Link>
      <ul className={styles.list} aria-label={!isNavigation ? t('menu:navTitle') : ''}>
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
                )}>
                <span className={styles.round}>
                  <Icon path={src} size={1} color={color} />
                </span>
                {isMobile ? t(`menu:${titleKey}`) : !isNavigation && t(`menu:${titleKey}`)}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};

export default SideMenu;
