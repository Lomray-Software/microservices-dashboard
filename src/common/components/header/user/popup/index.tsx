import { mdiCogSync, mdiExitRun } from '@mdi/js';
import Icon from '@mdi/react';
import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonPrimary from '@components/button-primary';
import Link from '@components/link';
import combineCss from '@helpers/combine-css';
import makeURL from '@helpers/make-url';
import styles from './styles.module.scss';

interface IPopup {
  isOpen: boolean;
  signOut: () => Promise<void> | void;
  userId?: string;
}

const Popup: FC<IPopup> = ({ isOpen, signOut, userId }) => {
  const { t } = useTranslation();

  return (
    <div className={combineCss(styles.modalUser, isOpen ? styles.open : '')}>
      <ul aria-label={t('profileTitle')} className={styles.list}>
        <li>
          <div className={styles.round}>
            <Icon path={mdiCogSync} size={1} color="yellow" />
          </div>
          <Link
            to={makeURL('USER', { id: String(userId) })}
            className={combineCss(styles.item, styles.link)}
          >
            {t('settings')}
          </Link>
          <span className={styles.bottomElement} />
        </li>
        <li>
          <div className={styles.round}>
            <Icon path={mdiExitRun} size={1} color="red" />
          </div>
          <ButtonPrimary
            type="button"
            className={combineCss(styles.item, styles.logout)}
            onClick={signOut}
          >
            {t('logOut')}
          </ButtonPrimary>
        </li>
      </ul>
    </div>
  );
};

export default Popup;
