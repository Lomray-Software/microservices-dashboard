import React, { FC } from 'react';
import UserPopup from '@modals/user';
import styles from './styles.module.scss';

interface IUser {
  isOpen: boolean;
  setIsOpenPopup: () => void;
  signOut: () => void;
  photo?: string;
  name?: string;
}

const User: FC<IUser> = ({ isOpen, setIsOpenPopup, signOut, photo, name }) => (
  <div role="presentation" onClick={setIsOpenPopup} className={styles.wrapperUser}>
    <div className={styles.wrapperImage}>
      <img className={styles.img} src={photo} alt="user-avatar" />
    </div>
    <p className={styles.name}>
      {name}
      <i className={styles.chevron} />
    </p>
    <UserPopup isOpen={isOpen} signOut={signOut} />
  </div>
);

export default User;
