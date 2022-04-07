import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Link from '@components/link';
import MENU from '@constants/menu';
import combineCss from '@helpers/combine-css';
import getActiveMenu from '@helpers/get-active-menu';
import styles from './styles.module.scss';

/**
 * Side menu
 * @constructor
 */

const SideMenu: FC = () => {
  const { t } = useTranslation(['menu']);
  const { pathname } = useLocation();

  const activeMenuItem = getActiveMenu(pathname);

  return (
    <ul>
      {Object.entries(MENU).map(([link, { titleKey }]) => (
        <li key={link}>
          <Link
            to={link}
            className={combineCss(activeMenuItem.titleKey === titleKey ? styles.active : '')}>
            {t(`menu:${titleKey}`)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideMenu;
