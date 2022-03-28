import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { StoreProps } from './index.stores';

const Header: FC<StoreProps> = ({ authStore: { logout } }) => {
  const { t } = useTranslation();

  return (
    <header>
      <div>This is a header</div>
      <button type="button" onClick={logout}>
        {t('logoutButton')}
      </button>
    </header>
  );
};

export default Header;
