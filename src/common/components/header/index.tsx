import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Notification } from '@assets/images/icons/notification-white.svg';
import ButtonPrimary from '@components/button-primary';
import Link from '@components/link';
import combineCss from '@helpers/combine-css';
import type { StoreProps } from './index.stores';
import styles from './styles.module.scss';

interface IHeader {
  toggleNavigation: () => void;
}

const Header: FC<StoreProps & IHeader> = ({ userStore: { user }, toggleNavigation }) => {
  const { t } = useTranslation('translation');

  return (
    <header className={styles.header}>
      <button type="button" className={styles.button} onClick={toggleNavigation}>
        {[...Array(3)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span className={styles.line} key={i} />
        ))}
      </button>
      <label>
        <input className={styles.input} type="text" placeholder={t('search')} />
      </label>
      <div className={styles.notification}>
        <Notification />
      </div>
      <div className={styles.wrapperUser}>
        <div className={styles.wrapperImage}>
          <img className={styles.img} src={user?.profile?.photo} alt="user-avatar" />
        </div>
        <p className={styles.name}>
          {user?.firstName}
          <i className={styles.chevron} />
        </p>
        <div className={styles.modalUser}>
          <ul aria-label={t('profileTitle')} className={styles.list}>
            <li>
              <div className={styles.round} />
              <Link to="/settings" className={combineCss(styles.item, styles.link)}>
                {t('settings')}
              </Link>
              <span className={styles.bottomElement} />
            </li>
            <li>
              <ButtonPrimary className={combineCss(styles.item, styles.logout)} type="button">
                {t('logOut')}
              </ButtonPrimary>
              <span className={styles.bottomElement} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
