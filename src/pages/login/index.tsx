import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { SSRComponent } from '@interfaces/ssr-component';
import validationSchema from './index.form';
import type { StoreProps } from './index.stores';

export type Props = StoreProps;

/**
 * Login page
 */
const Login: SSRComponent<Props> = ({ authStore: { error, signIn } }) => {
  const { t } = useTranslation(['login-page', 'forms']);
  const [initialValues] = useState({ login: 'test@test.com', password: '123456789' });

  /**
   * Login user
   */
  const onSubmit = useCallback(
    async (values: typeof initialValues) => {
      const { login, password } = values;

      await signIn(login, password);
    },
    [signIn],
  );

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="login">{t('login-page:fieldLogin')}</label>
          <Field name="login" placeholder={t('login-page:fieldLogin')} />
          <ErrorMessage name="login" />
          <label htmlFor="password">{t('login-page:fieldPassword')}</label>
          <Field type="password" name="password" placeholder={t('login-page:fieldPassword')} />
          <ErrorMessage name="password" />
          {error && <span>{error}</span>}
          <button type="submit" disabled={isSubmitting}>
            {t('login-page:buttonText')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

Login.getInitialProps = () => ({
  context: {
    app: {
      hasHeader: false,
      hasFooter: false,
    },
  },
});

export default Login;
