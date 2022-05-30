import { Form, Formik } from 'formik';
import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '@components/error-message';
import Input from '@components/forms/input/index.formik';
import SubmitButton from '@components/forms/submit-button';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import data from '../overview/data';
import type { StoreProps } from './index.stores';
import validationSchema from './validation-schema';
import styles from './styles.module.scss';

export interface IEditProfileState {
  firstName: IUser['firstName'];
  middleName: IUser['middleName'];
  lastName: IUser['lastName'];
  phone: IUser['phone'];
  birthDay: IProfile['birthDay'];
}

const EditProfile: FC<StoreProps> = ({ user: { user, error } }) => {
  const { t } = useTranslation('users-page');

  const [innitValues] = useState<Partial<IEditProfileState>>({
    firstName: user?.firstName,
    middleName: user?.middleName,
    lastName: user?.lastName,
    phone: user?.phone,
    birthDay: user?.profile?.birthDay,
  });

  const onSubmit = useCallback((values: IEditProfileState) => {
    const { firstName, middleName, lastName, phone, birthDay } = validationSchema().cast(
      values,
    ) as IEditProfileState;

    console.log(firstName, middleName, lastName, phone, birthDay);
  }, []);

  return (
    <div className={styles.column}>
      <Formik initialValues={innitValues} onSubmit={onSubmit}>
        <Form className={styles.form}>
          {data.map((item) => (
            <div key={item} className={styles.columnInfo}>
              <span className={styles.description}>{t(item)}</span>
              <Input name={item} placeholder={t(item)} />
            </div>
          ))}
          <ErrorMessage>{error}</ErrorMessage>
          <SubmitButton className={styles.button} hasLoader>
            {t('buttonEditProfile')}
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfile;
