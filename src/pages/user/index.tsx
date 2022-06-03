import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@components/breadcrumbs';
import Tabs from '@components/tabs';
import ROUTES from '@constants/routes';
import InitialProps from '@helpers/initial-props';
import type { SSRComponent } from '@interfaces/ssr-component';
import CardUser from './card-user';
import ChangePassword from './change-password/index.wrapper';
import EditProfile from './edit-profile/index.wrapper';
import stores from './index.stores';
import type { StoreProps } from './index.stores';
import Overview from './overview';
import styles from './styles.module.scss';

export enum TABS {
  OVERVIEW = 'overview',
  EDIT_PROFILE = 'editProfile',
  CHANGE_PASSWORD = 'changePassword',
}

type Props = StoreProps;

/**
 * Users list page
 * @constructor
 */
const User: SSRComponent<Props> = ({ userPage: { user } }) => {
  const { t } = useTranslation(['user-page', 'menu']);

  const [activeTab, setActiveTab] = useState<TABS>(TABS.OVERVIEW);

  const activeItem = useMemo(() => {
    switch (activeTab) {
      case TABS.OVERVIEW:
        return <Overview user={user} />;

      case TABS.EDIT_PROFILE:
        return <EditProfile />;

      case TABS.CHANGE_PASSWORD:
        return <ChangePassword />;
    }
  }, [activeTab, user]);

  const tabs = useMemo(
    () => Object.values(TABS).map((item) => ({ title: t(`user-page:${item}`), id: item })),
    [t],
  );

  return (
    <div className="wrapper">
      <Helmet>
        <title>{t('user-page:pageTitle')}</title>
      </Helmet>
      <Breadcrumbs>
        <Breadcrumbs.Item to={ROUTES.HOME} title={t('menu:home')} />
        <Breadcrumbs.Item to={ROUTES.USERS} title={t('menu:users')} />
        <Breadcrumbs.Item
          to={ROUTES.USERS}
          title={user?.username ?? `${String(user?.firstName)} ${String(user?.lastName)}`}
        />
      </Breadcrumbs>
      <div className={styles.body}>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.wrapper}>
          <h3 className={styles.titleInfo}>{t(`user-page:${activeTab}`)}</h3>
          <CardUser
            profile={user?.profile}
            firstName={user?.firstName}
            lastName={user?.lastName}
            email={user?.email}
          />
          {activeItem}
        </div>
      </div>
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
