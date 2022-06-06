import type { FC } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@components/breadcrumbs';

const Home: FC = () => {
  const { t } = useTranslation('home-page');

  return (
    <div className="wrapper">
      <Helmet>
        <title>{t('pageTitle')}</title>
      </Helmet>
      <Breadcrumbs />
      Welcome to microservices dashboard.
    </div>
  );
};

export default Home;
