import { Form, Formik } from 'formik';
import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Field from '@components/forms/field';
import SubmitButton from '@components/forms/submit-button';
import fields from './fields';
import type { StoreProps } from './index.stores';
import styles from './styles.module.scss';

interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  reEnterNewPassword: string;
}

const ChangePassword: FC<StoreProps> = () => {
  const { t } = useTranslation('users-page');

  const [innitValues] = useState<IChangePassword>({
    currentPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
  });

  const onSubmit = useCallback((value) => console.info(value), []);

  return (
    <div className={styles.column}>
      <Formik initialValues={innitValues} onSubmit={onSubmit}>
        <Form className={styles.form}>
          {fields.map((name) => (
            <Field key={name} name={name} isLine />
          ))}
          <SubmitButton className={styles.button} hasLoader>
            {t('buttonChangePassword')}
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
