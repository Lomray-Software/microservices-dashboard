import type { FC } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@components/breadcrumbs';
import ROUTES from '@constants/routes';

const Home: FC = () => {
  const { t } = useTranslation(['home-page', 'menu']);

  return (
    <div className="wrapper">
      <Helmet>
        <title>{t('home-page:pageTitle')}</title>
      </Helmet>
      <Breadcrumbs>
        <Breadcrumbs.Item to={ROUTES.HOME} title={t('menu:home')} />
      </Breadcrumbs>
      Welcome to microservices dashboard.
    </div>
  );
};

export default Home;
