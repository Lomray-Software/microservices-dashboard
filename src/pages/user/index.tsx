import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@components/breadcrumbs';
import Overview from '@components/overview';
import Tabs from '@components/tabs';
import ROUTES from '@constants/routes';
import InitialProps from '@helpers/initial-props';
import type { SSRComponent } from '@interfaces/ssr-component';
import IdentityProviders from '@pages/user/identity-providers/index.wrapper';
import i18n from '@services/localization';
import UserEntity from '@store/entities/user';
import CardUser from './card-user';
import ChangePassword from './change-password/index.wrapper';
import { userFields, profileFields } from './data';
import EditProfile from './edit-profile/index.wrapper';
import stores from './index.stores';
import type { StoreProps } from './index.stores';

type Props = StoreProps;

/**
 * Users list page
 * @constructor
 */
const User: SSRComponent<Props> = ({ userPage: { user } }) => {
  const { t } = useTranslation(['user-page', 'users-page', 'menu']);

  return (
    <div className="wrapper">
      <Helmet>
        <title>{t('user-page:pageTitle')}</title>
      </Helmet>
      <Breadcrumbs>
        <Breadcrumbs.Item to={ROUTES.USERS} title={t('menu:users')} />
        <Breadcrumbs.Item to={ROUTES.USERS} title={UserEntity.getName(user)} />
      </Breadcrumbs>
      <Tabs
        tabs={{
          overview: {
            title: i18n.t('user-page:overview'),
            Component: (
              <Overview
                title={t('user-page:overview')}
                data={[
                  { fields: userFields, entity: user },
                  { fields: profileFields, entity: user?.profile },
                ]}>
                <CardUser
                  profile={user?.profile}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  email={user?.email}
                />
              </Overview>
            ),
          },
          editProfile: {
            title: i18n.t('user-page:editProfile'),
            Component: <EditProfile />,
          },
          changePassword: {
            title: i18n.t('user-page:changePassword'),
            Component: <ChangePassword />,
          },
          identityProviders: {
            title: i18n.t('user-page:identityProviders'),
            Component: <IdentityProviders />,
          },
        }}
      />
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
