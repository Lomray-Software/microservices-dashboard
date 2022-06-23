import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import type { FC } from 'react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Column, Row } from 'react-table';
import ButtonPrimary from '@components/button-primary';
import Overview from '@components/overview';
import Table from '@components/table';
import { IJsonQueryFieldType } from '@store/endpoints/interfaces/common/query';
import type { IIdentityProvider } from '@store/endpoints/interfaces/users/entities/identity-provider';
import { fieldsIdentity, fieldsIdentityParams } from './fields';
import type { StoreProps } from './index.stores';
import styles from './styles.module.scss';

const IdentityProviders: FC<StoreProps> = ({
  identityProvider: {
    entities,
    tableState: { page, pageSize, totalCount },
    setPage,
    setPageSize,
    setFilter,
    setOrderBy,
    addSubscribe,
    getIdentityProviders,
    removeIdentity,
  },
}) => {
  const { t } = useTranslation(['translation', 'user-page']);

  useEffect(() => {
    void getIdentityProviders();
    const disposer = addSubscribe();

    return () => disposer();
  }, [addSubscribe, getIdentityProviders]);

  const columns: Column<IIdentityProvider>[] = useMemo(
    () => [
      {
        Header: t('user-page:provider'),
        accessor: 'provider',
        filterParams: {
          castType: IJsonQueryFieldType.text,
        },
      },
      {
        Header: t('user-page:identifier'),
        accessor: 'identifier',
      },
      {
        Header: t('user-page:type'),
        accessor: 'type',
      },
      {
        id: 'remove',
        width: 50,
        maxWidth: 50,
        Header: () => t('translation:columnActions'),
        disableSortBy: true,
        disableFilters: true,
        Cell: ({ row }: { row: Row<IIdentityProvider> }) => (
          <ButtonPrimary
            kind="secondary"
            onClick={removeIdentity.bind(null, row.original.provider, row.original.identifier)}>
            <Icon path={mdiDelete} size={1.2} color="#8f5fe8" />
          </ButtonPrimary>
        ),
      },
    ],
    [removeIdentity, t],
  );

  const expandComponent = useCallback(
    (index: string) => (
      <div className={styles.expandContainer}>
        <Overview
          title={`${t('user-page:params')}:`}
          data={[
            { fields: fieldsIdentity, entity: entities[index], key: 'fieldsIdentity' },
            {
              fields: fieldsIdentityParams,
              entity: entities[index].params,
              key: 'fieldsIdentityParams',
            },
          ]}
        />
      </div>
    ),
    [entities, t],
  );

  return (
    <Table<IIdentityProvider>
      columns={columns}
      data={entities}
      page={page}
      setPage={setPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      onFilter={setFilter}
      onSortBy={setOrderBy}
      count={totalCount}
      expandComponent={expandComponent}
    />
  );
};

export default IdentityProviders;
