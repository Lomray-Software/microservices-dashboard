import { mdiBackburger } from '@mdi/js';
import Icon from '@mdi/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Notification } from '@assets/images/icons/notification-white.svg';
import Link from '@components/link';
import combineCss from '@helpers/combine-css';
import useToggle from '@helpers/use-toggle';
import SideMenu from '../side-menu/index';
import type { StoreProps } from './index.stores';
import User from './user';
import styles from './styles.module.scss';

interface IHeader {
  toggleNavigation: () => void;
}

const Header: FC<StoreProps & IHeader> = ({
  userStore: { user },
  toggleNavigation,
  authStore: { signOut },
}) => {
  const { t } = useTranslation('translation');

  const [isOpenPopup, setIsOpenPopup] = useToggle(false);
  const [isOpenNavigation, setIsOpenNavigation] = useToggle(false);

  return (
    <header className={styles.header}>
      {isOpenPopup && (
        <div role="presentation" className={styles.closeItem} onClick={setIsOpenPopup} />
      )}
      <button type="button" className={styles.button} onClick={toggleNavigation}>
        {[...Array(3)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span className={styles.line} key={i} />
        ))}
      </button>
      <Link to="/" className={styles.logo}>
        D
      </Link>
      <label className={styles.wrapperSearch}>
        <input className={styles.input} type="text" placeholder={t('search')} />
      </label>
      <div className={styles.notification}>
        <Notification />
      </div>
      <User
        isOpen={isOpenPopup}
        photo={user?.profile?.photo}
        name={user?.firstName}
        signOut={signOut}
        setIsOpenPopup={setIsOpenPopup}
      />
      <button className={styles.navigationButton} type="button" onClick={setIsOpenNavigation}>
        <Icon path={mdiBackburger} size={1.5} color="#6c7293" />
      </button>
      <div
        className={combineCss(
          styles.wrapperNavigation,
          isOpenNavigation ? styles.wrapperNavigationOpen : '',
        )}>
        <SideMenu isToggle={isOpenNavigation} isMobile />
      </div>
    </header>
  );
};

export default Header;
