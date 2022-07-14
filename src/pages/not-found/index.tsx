import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import StatusGate from '@components/status-gate';
import type { SSRComponent } from '@interfaces/ssr-component';
import styles from './styles.module.scss';

/**
 * Not found page
 * @constructor
 */
const NotFound: SSRComponent = () => {
  const { t } = useTranslation();

  return (
    <StatusGate code={404}>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className={styles.container}>
        <h2>{t('notFound404')}</h2>
      </div>
    </StatusGate>
  );
};

export default NotFound;
