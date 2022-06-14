import type { FC } from 'react';
import React from 'react';
import useToggle from '@hooks/use-toggle';
import type { StoreProps } from './index.stores';
import Popup from './popup';
import styles from './styles.module.scss';

const User: FC<StoreProps> = ({ userStore: { user }, authStore: { signOut } }) => {
  const [isOpenPopup, setIsOpenPopup] = useToggle(false);

  return (
    <>
      {isOpenPopup && (
        <div role="presentation" className={styles.closeItem} onClick={setIsOpenPopup} />
      )}
      <div role="presentation" onClick={setIsOpenPopup} className={styles.wrapperUser}>
        <div className={styles.wrapperImage}>
          <img className={styles.img} src={user?.profile?.photo} alt="user-avatar" />
        </div>
        <p className={styles.name}>
          {user?.firstName}
          <i className={styles.chevron} />
        </p>
        <Popup isOpen={isOpenPopup} signOut={signOut} userId={user?.id} />
      </div>
    </>
  );
};

export default User;
