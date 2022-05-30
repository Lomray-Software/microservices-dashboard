import { Form, Formik } from 'formik';
import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '@components/error-message';
import Input from '@components/forms/input/index.formik';
import SubmitButton from '@components/forms/submit-button';
import data from './data';
import type { StoreProps } from './index.stores';
import styles from './styles.module.scss';

interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  reEnterNewPassword: string;
}

const ChangePassword: FC<StoreProps> = ({ user: { user, error } }) => {
  const { t } = useTranslation('users-page');

  const [innitValues] = useState<IChangePassword>({
    currentPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
  });

  const onSubmit = useCallback(
    (value) => {
      console.log(value);
      console.log(user);
    },
    [user],
  );

  return (
    <div className={styles.column}>
      <Formik initialValues={innitValues} onSubmit={onSubmit}>
        <Form className={styles.form}>
          {data.map((item) => (
            <div key={item} className={styles.columnInfo}>
              <span className={styles.description}>{t(item)}</span>
              <Input type="password" name={item} placeholder={t(item)} />
            </div>
          ))}
          <ErrorMessage>{error}</ErrorMessage>
          <SubmitButton className={styles.button} hasLoader>
            {t('buttonChangePassword')}
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
