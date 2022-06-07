import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Breadcrumbs from '@components/breadcrumbs';
import ROUTES from '@constants/routes';
import InitialProps from '@helpers/initial-props';
import type { SSRComponent } from '@interfaces/ssr-component';
import CardUser from './card-user';
import ChangePassword from './change-password/index.wrapper';
import { tabs } from './data';
import EditProfile from './edit-profile/index.wrapper';
import stores from './index.stores';
import type { StoreProps } from './index.stores';
import Overview from './overview';
import styles from './styles.module.scss';

type Props = StoreProps;

/**
 * Users list page
 * @constructor
 */
const User: SSRComponent<Props> = ({ userPage: { user, getUserName } }) => {
  const { t } = useTranslation(['user-page', 'menu']);

  return (
    <div className="wrapper">
      <Helmet>
        <title>{t('user-page:pageTitle')}</title>
      </Helmet>
      <Breadcrumbs>
        <Breadcrumbs.Item to={ROUTES.USERS} title={t('menu:users')} />
        <Breadcrumbs.Item to={ROUTES.USERS} title={getUserName(user)} />
      </Breadcrumbs>
      <Tabs className={styles.body}>
        <TabList className={styles.tabs}>
          {tabs.map((title) => (
            <Tab key={title}>{t(`user-page:${title}`)}</Tab>
          ))}
        </TabList>
        <CardUser
          profile={user?.profile}
          firstName={user?.firstName}
          lastName={user?.lastName}
          email={user?.email}
        />
        <TabPanel>
          <Overview user={user} />
        </TabPanel>
        <TabPanel>
          <EditProfile />
        </TabPanel>
        <TabPanel>
          <ChangePassword />
        </TabPanel>
      </Tabs>
    </div>
  );
};

User.getInitialProps = InitialProps(async ({ userPage: { getUser } }, { match }) => {
  const {
    params: { id },
  } = match;

  await getUser(id);
}, stores);

export default User;
