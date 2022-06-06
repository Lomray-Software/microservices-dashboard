import type { FormikConfig } from 'formik';
import { Form, Formik } from 'formik';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Field from '@components/forms/field';
import SubmitButton from '@components/forms/submit-button';
import { setErrorForm } from '@helpers/handle-validation-errors';
import type { IChangePassword } from '@store/modules/pages/user/change-password';
import fields from './fields';
import type { StoreProps } from './index.stores';
import validationSchema from './validation-schema';
import styles from './styles.module.scss';

const ChangePassword: FC<StoreProps> = ({
  userChangePassword: { initialValues, save, setError, error },
}) => {
  const { t } = useTranslation('user-page');

  /**
   * Change password
   */
  const onSave: FormikConfig<IChangePassword>['onSubmit'] = useCallback(
    async (values, { setErrors }) => {
      const result = await save(validationSchema().cast(values) as IChangePassword);

      setErrorForm(result, setErrors, setError);
    },
    [save, setError],
  );

  return (
    <div className={styles.column}>
      <h3 className={styles.title}>{t('changePassword')}</h3>
      <Formik initialValues={initialValues} onSubmit={onSave} validationSchema={validationSchema}>
        <Form className={styles.form}>
          {fields.map((name) => (
            <Field
              key={name}
              type="password"
              name={name}
              placeholder={t(name)}
              title={t(name)}
              isInline
            />
          ))}
          <SubmitButton className={styles.button} error={error} hasLoader>
            {t('buttonChangePassword')}
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
