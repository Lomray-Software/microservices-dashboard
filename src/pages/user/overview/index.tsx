import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import { fields } from '../fields';
import styles from './styles.module.scss';

interface IOverview {
  user: IUser | null;
}

const Overview: FC<IOverview> = ({ user }) => {
  const { t } = useTranslation('users-page');

  console.log(user?.username);

  return (
    <div className={styles.column}>
      {fields.map((field) => (
        <div key={field} className={styles.columnInfo}>
          <span className={styles.description}>{t(field)}</span>
          {field === 'birthDay' ? (
            <span className={styles.info}>{user?.profile?.birthDay}</span>
          ) : (
            <span className={styles.info}>{user?.[field]}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Overview;
