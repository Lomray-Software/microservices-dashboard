import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import data from './data';
import styles from './styles.module.scss';

interface IOverview {
  user: IUser | null;
}

const Overview: FC<IOverview> = ({ user }) => {
  const { t } = useTranslation('users-page');

  return (
    <div className={styles.column}>
      {data.map((elem) => (
        <div key={elem} className={styles.columnInfo}>
          <span className={styles.description}>{t(elem)}</span>
          {elem === 'birthDay' ? (
            <span className={styles.info}>{user?.profile?.birthDay}</span>
          ) : (
            <span className={styles.info}>{user?.[elem]}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Overview;
