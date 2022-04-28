import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import SubmitButton from '@components/forms/submit-button';
import type { SSRComponent } from '@interfaces/ssr-component';
import type { StoreProps } from './index.stores';
import validationSchema from './validation-schema';

type Props = StoreProps;

export interface ILoginForm {
  login: string;
  password: string;
}

/**
 * Login page
 */
const Login: SSRComponent<Props> = ({ authStore: { error, signIn, isLoading } }) => {
  const { t } = useTranslation(['login-page', 'forms']);
  const [initialValues] = useState<ILoginForm>({ login: 'test@test.com', password: '123456789' });

  /**
   * Login user
   */
  const onSubmit = useCallback(
    async (values: ILoginForm) => {
      const { login, password } = validationSchema().cast(values) as ILoginForm;

      await signIn(login, password);
    },
    [signIn],
  );

  return (
    <>
      <Helmet>
        <title>{t('login-page:pageTitle')}</title>
      </Helmet>
      {(isLoading && <div>Loading...</div>) || (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          <Form>
            <label htmlFor="login">{t('login-page:fieldLogin')}</label>
            <Field name="login" placeholder={t('login-page:fieldLogin')} />
            <ErrorMessage name="login" />
            <label htmlFor="password">{t('login-page:fieldPassword')}</label>
            <Field type="password" name="password" placeholder={t('login-page:fieldPassword')} />
            <ErrorMessage name="password" />
            {error && <span>{error}</span>}
            <SubmitButton>{t('login-page:buttonText')}</SubmitButton>
          </Form>
        </Formik>
      )}
    </>
  );
};

Login.getInitialProps = () => ({
  context: {
    app: {
      hasHeader: false,
      hasFooter: false,
      hasSideMenu: false,
    },
  },
});

export default Login;
