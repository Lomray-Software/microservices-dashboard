import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import type { FC } from 'react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Column } from 'react-table';
import ButtonPrimary from '@components/button-primary';
import Overview from '@components/overview';
import Table from '@components/table';
import type { IIdentityProvider } from '@store/endpoints/interfaces/users/entities/identity-provider';
import { fieldsIdentity, fieldsIdentityParams } from './fields';
import type { StoreProps } from './index.stores';
import styles from './styles.module.scss';

const IdentityProviders: FC<StoreProps> = ({
  identityProvider: {
    page,
    pageSize,
    identityProvides,
    count,
    setPage,
    setPageSize,
    setWhere,
    setSortBy,
    addSubscribe,
    getIdentities,
    removeIdentity,
  },
}) => {
  const { t } = useTranslation('user-page');

  useEffect(() => {
    void getIdentities();
    const disposer = addSubscribe();

    return () => disposer();
  }, [addSubscribe, getIdentities]);

  const columns: Column<IIdentityProvider>[] = useMemo(
    () => [
      {
        Header: t('provider'),
        accessor: 'provider',
      },
      {
        Header: t('identifier'),
        accessor: 'identifier',
      },
      {
        Header: t('type'),
        accessor: 'type',
      },
      {
        id: 'remove',
        width: 50,
        maxWidth: 50,
        Header: () => null,
        disableSortBy: true,
        disableFilters: true,
        Cell: () => (
          <ButtonPrimary kind="secondary" onClick={removeIdentity}>
            <Icon path={mdiDelete} size={1.2} color="#8f5fe8" />
          </ButtonPrimary>
        ),
      },
    ],
    [removeIdentity, t],
  );

  const expandComponent = useCallback(
    (id) => (
      <div className={styles.expandContainer}>
        <Overview
          title={`${t('params')}:`}
          data={[
            { fields: fieldsIdentity, entity: identityProvides[id] },
            {
              fields: fieldsIdentityParams,
              entity: identityProvides[id].params,
            },
          ]}
        />
      </div>
    ),
    [identityProvides, t],
  );

  return (
    <Table<IIdentityProvider>
      page={page}
      setPage={setPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      onFilter={setWhere}
      onSortBy={setSortBy}
      count={count}
      columns={columns}
      data={identityProvides}
      expandComponent={expandComponent}
    />
  );
};

export default IdentityProviders;
