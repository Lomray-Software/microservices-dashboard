import type { FC } from 'react';
import React from 'react';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import User from '@store/entities/user';
import styles from './styles.module.scss';

interface ICardUser {
  profile?: IUser['profile'];
  firstName?: IUser['firstName'];
  lastName?: IUser['lastName'];
  email?: IUser['email'];
  userRole?: string;
}

const CardUser: FC<ICardUser> = ({ profile, firstName, lastName, email, userRole }) => (
  <div className={styles.user}>
    <div className={styles.wrapperImage}>
      <img className={styles.img} src={User.getAvatar(profile)} alt="user-avatar" />
    </div>
    <p className={styles.name}>
      <span>{firstName}</span>
      <span>{lastName}</span>
    </p>
    <span className={styles.email}>{email}</span>
    <span className={styles.role}>{userRole}</span>
  </div>
);

export default CardUser;
