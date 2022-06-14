import type { FormikConfig } from 'formik';
import { Form, Formik } from 'formik';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '@components/error-message';
import Fields from '@components/forms/fields';
import SubmitButton from '@components/forms/submit-button';
import { handleStateForm } from '@helpers/handle-state-form';
import type { IEditProfile } from '@store/modules/pages/user/edit-profile';
import { userFields, profileFields } from '../data';
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

      handleStateForm(result, setErrors, setError);
    },
    [save, setError],
  );

  return (
    <div className={styles.column}>
      <h3 className={styles.title}>{t('user-page:editProfile')}</h3>
      <Formik initialValues={initialValues} onSubmit={onSave} validationSchema={validationSchema}>
        <Form className={styles.form}>
          <Fields fields={[...userFields, ...profileFields]} isInline />
          <ErrorMessage>{error}</ErrorMessage>
          <SubmitButton className={styles.button} hasLoader isInitialDisabled>
            {t('user-page:buttonEditProfile')}
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfile;
