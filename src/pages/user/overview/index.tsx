import type { FC } from 'react';
import React from 'react';
import Fields from '@components/fields';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import { fields } from '../fields';

interface IOverview {
  user: IUser | null;
}

const Overview: FC<IOverview> = ({ user }) => {
  const data = fields.map((field) => ({
    label: field,
    value: field === 'birthDay' ? user?.profile?.birthDay : user?.[field],
  }));

  return <Fields data={data} />;
};

export default Overview;
