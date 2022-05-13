import { Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '@components/error-message';
import Input from '@components/forms/input/index.formik';
import SubmitButton from '@components/forms/submit-button';
import { APP_SHORT_NAME } from '@constants/index';
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
const Login: SSRComponent<Props> = ({ authStore: { error, signIn } }) => {
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
      <div className={combineCss('container', styles.container)}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h1 className={styles.title}>{APP_SHORT_NAME}</h1>
            <p className={styles.description}>
              <span className={styles.welcomeMessage}>{t('translation:welcomeMessage')}</span>
              <span className={styles.text}>{t('translation:warningText')}</span>
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form className={styles.form}>
              <Input name="login" type="text" placeholder={t('login-page:fieldLogin')} />
              <Input name="password" type="password" placeholder={t('login-page:fieldPassword')} />
              <ErrorMessage error={error} />
              <SubmitButton className={styles.button} hasLoader>
                {t('login-page:buttonText')}
              </SubmitButton>
            </Form>
          </Formik>
        </div>
      </div>
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
