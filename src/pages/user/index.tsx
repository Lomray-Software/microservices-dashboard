import InitialProps from '@lomray/afterjs-helpers/helpers/initial-props';
import type { SSRComponent } from '@lomray/afterjs-helpers/interfaces/ssr-component';
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@components/breadcrumbs';
import Overview from '@components/overview';
import Tabs from '@components/tabs';
import ROUTE from '@constants/routes';
import i18n from '@services/localization';
import UserEntity from '@store/entities/user';
import CardUser from './card-user';
import ChangePassword from './change-password/index.wrapper';
import { profileFields, userFields } from './data';
import EditAvatar from './edit-avatar/index.wrapper';
import EditProfile from './edit-profile/index.wrapper';
import type { StoreProps } from './index.stores';
import stores from './index.stores';

const IdentityProviders = React.lazy(() => import('./identity-providers/index.wrapper'));

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
        <Breadcrumbs.Item to={ROUTE.USERS.URL} title={t('menu:users')} />
        <Breadcrumbs.Item title={UserEntity.getName(user)} />
      </Breadcrumbs>
      <Tabs
        tabs={{
          overview: {
            title: i18n.t('user-page:overview'),
            Component: (
              <Overview
                title={t('user-page:overview')}
                data={[
                  { fields: userFields, entity: user, key: 'userFields' },
                  { fields: profileFields, entity: user?.profile, key: 'profileFields' },
                ]}
              >
                <CardUser user={user} />
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
          editAvatar: {
            title: i18n.t('user-page:userAvatar'),
            Component: <EditAvatar />,
          },
          identityProviders: {
            title: i18n.t('user-page:identityProviders'),
            Component: (
              <Suspense>
                <IdentityProviders />
              </Suspense>
            ),
          },
        }}
      />
    </div>
  );
};

InitialProps(
  async ({ userPage: { getUser } }, { match }) => {
    const {
      params: { id },
    } = match;

    if (!id) {
      return;
    }

    await getUser(id);
  },
  User,
  stores,
);

export default User;
