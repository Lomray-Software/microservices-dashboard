import { mdiCogSync, mdiExitRun } from '@mdi/js';
import Icon from '@mdi/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonPrimary from '@components/button-primary';
import Link from '@components/link';
import combineCss from '@helpers/combine-css';
import styles from './styles.module.scss';

interface IUser {
  isOpen: boolean;
  signOut: () => void;
}

const User: FC<IUser> = ({ isOpen, signOut }) => {
  const { t } = useTranslation();

  return (
    <div className={combineCss(styles.modalUser, isOpen ? styles.open : '')}>
      <ul aria-label={t('profileTitle')} className={styles.list}>
        <li className={styles.title}>
          <span className={styles.item}>{t('profileTitle')}</span>
          <span className={styles.bottomElement} />
        </li>
        <li>
          <div className={styles.round}>
            <Icon path={mdiCogSync} size={1} color="yellow" />
          </div>
          <Link to="/settings" className={combineCss(styles.item, styles.link)}>
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
            onClick={signOut}>
            {t('logOut')}
          </ButtonPrimary>
        </li>
      </ul>
    </div>
  );
};

export default User;
