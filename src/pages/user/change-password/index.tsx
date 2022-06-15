import type { FormikConfig } from 'formik';
import { Form, Formik } from 'formik';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '@components/error-message';
import Fields from '@components/forms/fields';
import SubmitButton from '@components/forms/submit-button';
import { handleStateForm } from '@helpers/handle-state-form';
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

      handleStateForm(result, setErrors, setError);
    },
    [save, setError],
  );

  return (
    <div className={styles.column}>
      <h3 className={styles.title}>{t('changePassword')}</h3>
      <Formik initialValues={initialValues} onSubmit={onSave} validationSchema={validationSchema}>
        <Form className={styles.form}>
          <Fields fields={fields} isInline />
          <ErrorMessage>{error}</ErrorMessage>
          <SubmitButton hasLoader isInitialDisabled>
            {t('buttonChangePassword')}
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
