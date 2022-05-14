import Icon from '@mdi/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Link from '@components/link';
import { APP_SHORT_NAME } from '@constants/index';
import MENU from '@constants/menu';
import combineCss from '@helpers/combine-css';
import getActiveMenu from '@helpers/get-active-menu';
import styles from './styles.module.scss';

/**
 * Side menu
 * @constructor
 */

interface ISideMenu {
  isToggle: boolean;
}

const SideMenu: FC<ISideMenu> = ({ isToggle }) => {
  const { t } = useTranslation(['menu']);
  const { pathname } = useLocation();

  const activeMenuItem = getActiveMenu(pathname);

  return (
    <nav className={combineCss(styles.navigation, isToggle ? styles.close : '')}>
      <Link to="/" className={styles.title}>
        {!isToggle ? APP_SHORT_NAME : 'D'}
      </Link>
      <ul className={styles.list} aria-label={!isToggle ? t('menu:navTitle') : ''}>
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
                {!isToggle && t(`menu:${titleKey}`)}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};

export default SideMenu;
