import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EntityFields from '@components/entity-fields';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import { fields } from '../fields';
import styles from './styles.module.scss';

interface IOverview {
  user: IUser | null;
}

const Overview: FC<IOverview> = ({ user }) => {
  const { t } = useTranslation(['users-page', 'user-page']);

  const data = fields.map((field) => ({
    label: t(`users-page:${field}`),
    value: field === 'birthDay' ? user?.profile?.birthDay : user?.[field],
  }));

  return (
    <>
      <h3 className={styles.title}>{t('user-page:overview')}</h3>
      <EntityFields data={data} />
    </>
  );
};

export default Overview;
