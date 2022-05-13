import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import SubmitButton from '@components/forms/submit-button';
import combineCss from '@helpers/combine-css';
import type { SSRComponent } from '@interfaces/ssr-component';
import type { StoreProps } from './index.stores';
import validationSchema from './validation-schema';
import styles from './styles.module.scss';

type Props = StoreProps;

export interface ILoginForm {
  login: string;
  password: string;
}

/**
 * Login page
 */
const Login: SSRComponent<Props> = ({ authStore: { error, signIn, isLoading } }) => {
  const { t } = useTranslation(['login-page', 'forms', 'translation']);
  const [initialValues] = useState<ILoginForm>({ login: '', password: '' });

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
        <div className={combineCss('container', styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <h1 className={styles.title}>{t('translation:coronaTitle')}</h1>
              <p className={styles.description}>
                <span className={styles.welcomeMessage}>{t('translation:welcomeMessage')}</span>
                <span className={styles.text}>{t('translation:warningText')}</span>
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              <Form className={styles.form} autoComplete="off">
                <label htmlFor="login" className={styles.label}>
                  <Field
                    className={styles.input}
                    type="text"
                    name="login"
                    autoComplete="new-password"
                    placeholder={t('login-page:fieldLogin')}
                  />
                  <span className={styles.errorMessage}>
                    <ErrorMessage name="login" />
                  </span>
                </label>
                <label htmlFor="password" className={styles.label}>
                  <Field
                    className={styles.input}
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t('login-page:fieldPassword')}
                  />
                  <span className={styles.errorMessage}>
                    <ErrorMessage name="password" />
                  </span>
                </label>
                <span className={combineCss(styles.errorMessage, styles.mainError)}>{error}</span>
                <SubmitButton className={styles.button}>{t('login-page:buttonText')}</SubmitButton>
              </Form>
            </Formik>
          </div>
        </div>
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
