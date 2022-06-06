import type { FormikConfig } from 'formik';
import { Form, Formik } from 'formik';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Field from '@components/forms/field';
import SubmitButton from '@components/forms/submit-button';
import { setErrorForm } from '@helpers/handle-validation-errors';
import type { IEditProfile } from '@store/modules/pages/user/edit-profile';
import { fields } from '../fields';
import type { StoreProps } from './index.stores';
import validationSchema from './validation-schema';
import styles from './styles.module.scss';

const EditProfile: FC<StoreProps> = ({ userEdit: { save, initialValues, setError, error } }) => {
  const { t } = useTranslation(['user-page', 'users-page']);

  /**
   * Save user & profile
   */
  const onSave: FormikConfig<IEditProfile>['onSubmit'] = useCallback(
    async (values, { setErrors }) => {
      const result = await save(validationSchema().cast(values) as IEditProfile);

      setErrorForm(result, setErrors, setError);
    },
    [save, setError],
  );

  return (
    <div className={styles.column}>
      <h3 className={styles.title}>{t('user-page:editProfile')}</h3>
      <Formik initialValues={initialValues} onSubmit={onSave} validationSchema={validationSchema}>
        <Form className={styles.form}>
          {fields.map((fieldName) => (
            <Field
              key={fieldName}
              name={fieldName}
              placeholder={t(`users-page:${fieldName}`)}
              title={t(`users-page:${fieldName}`)}
              isInline
            />
          ))}
          <SubmitButton className={styles.button} error={error} hasLoader>
            {t('user-page:buttonEditProfile')}
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfile;
