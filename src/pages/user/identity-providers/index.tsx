import type { FC } from 'react';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Column } from 'react-table';
import Table from '@components/table';
import type { IIdentityProvider } from '@store/endpoints/interfaces/users/entities/identity-provider';
import type { StoreProps } from './index.stores';

interface IIdentityProviders {
  id?: string;
}

type TProps = StoreProps & IIdentityProviders;

const IdentityProviders: FC<TProps> = ({
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
  },
  id,
}) => {
  const { t } = useTranslation('user-page');

  useEffect(() => {
    void getIdentities(id);
    const disposer = addSubscribe();

    return () => disposer();
  }, [addSubscribe, getIdentities, id]);

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
        Header: t('createdAt'),
        accessor: 'createdAt',
      },
      {
        Header: t('updatedAt'),
        accessor: 'updatedAt',
      },
    ],
    [t],
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
    />
  );
};

export default IdentityProviders;
