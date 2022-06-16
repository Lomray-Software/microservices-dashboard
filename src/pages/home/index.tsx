import type { FC } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@components/breadcrumbs';
import combineCss from '@helpers/combine-css';
import styles from './styles.module.scss';

const Home: FC = () => {
  const { t } = useTranslation('home-page');

  return (
    <div className={combineCss('wrapper', styles.container)}>
      <Helmet>
        <title>{t('pageTitle')}</title>
      </Helmet>
      <Breadcrumbs />
      <div className={styles.content}>Welcome to microservices dashboard.</div>
    </div>
  );
};

export default Home;
