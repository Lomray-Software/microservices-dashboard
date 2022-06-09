import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EntityFields from '@components/entity-fields';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import { userFields, profileFields } from '../data';
import styles from './styles.module.scss';

interface IOverview {
  user: IUser | null;
}

const Overview: FC<IOverview> = ({ user }) => {
  const { t } = useTranslation(['users-page', 'user-page']);

  const userData = userFields.map(({ name }) => ({
    label: t(`users-page:${name}`),
    value: user?.[name],
  }));

  const profileData = profileFields.map(({ name }) => ({
    label: t(`users-page:${name}`),
    value: user?.profile[name],
  }));

  return (
    <>
      <h3 className={styles.title}>{t('user-page:overview')}</h3>
      <EntityFields data={[...userData, ...profileData]} />
    </>
  );
};

export default Overview;
