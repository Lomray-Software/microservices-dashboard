import Role from '@lomray/microservices-client-api/constants/role';
import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import User from '@store/entities/user';
import styles from './styles.module.scss';

interface ICardUser {
  user: IUser | null;
}

const CardUser: FC<ICardUser> = ({ user }) => {
  const { t } = useTranslation(['user-page']);

  return (
    <div className={styles.user}>
      <div className={styles.wrapperImage}>
        <img className={styles.img} src={User.getAvatar(user)} alt="user-avatar" />
      </div>
      <p className={styles.name}>
        <span>{user?.firstName}</span>
        <span>{user?.lastName}</span>
      </p>
      <span className={styles.email}>{user?.email}</span>
      <span className={styles.role}>{t(`user-page:${user?.role || Role.user}`)}</span>
    </div>
  );
};

export default CardUser;
