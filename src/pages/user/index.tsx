import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import combineCss from '@helpers/combine-css';
import InitialProps from '@helpers/initial-props';
import type { SSRComponent } from '@interfaces/ssr-component';
import CardUser from '@pages/user/card-user';
import ChangePassword from './change-password/index.wrapper';
import EditProfile from './edit-profile/index.wrapper';
import stores from './index.stores';
import type { StoreProps } from './index.stores';
import Overview from './overview';
import styles from './styles.module.scss';

enum TABS {
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
  const { t } = useTranslation('users-page');

  const [activeTab, setActiveTab] = useState<TABS>(TABS.OVERVIEW);

  const child = useMemo(() => {
    switch (activeTab) {
      case TABS.OVERVIEW:
        return <Overview user={user} />;

      case TABS.EDIT_PROFILE:
        return <EditProfile />;

      case TABS.CHANGE_PASSWORD:
        return <ChangePassword />;
    }
  }, [activeTab, user]);

  return (
    <div>
      <Helmet>
        <title>{t('pageTitle')}</title>
      </Helmet>
      <div className={styles.body}>
        <div className={styles.tabs}>
          {Object.values(TABS).map((item) => (
            <button
              type="button"
              onClick={setActiveTab.bind(null, item)}
              key={item}
              className={combineCss(styles.tab, item === activeTab ? styles.active : '')}>
              {t(item)}
            </button>
          ))}
        </div>
        <div className={styles.wrapper}>
          <h3 className={styles.titleInfo}>{t(activeTab)}</h3>
          <CardUser
            profile={user?.profile}
            firstName={user?.firstName}
            lastName={user?.lastName}
            email={user?.email}
          />
          {child}
        </div>
      </div>
    </div>
  );
};

User.getInitialProps = InitialProps(async ({ userPage }, { location }) => {
  const url = location?.pathname.split('/');

  await userPage.getUser(String(url?.[url.length - 1]));
}, stores) as never;

export default User;
