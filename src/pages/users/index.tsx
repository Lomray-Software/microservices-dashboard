import { JQFieldType } from '@lomray/microservices-types';
import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import type { Column } from 'react-table';
import Breadcrumbs from '@components/breadcrumbs';
import Table from '@components/table';
import ROUTE from '@constants/routes';
import InitialProps from '@helpers/initial-props';
import makeURL from '@helpers/make-url';
import type { SSRComponent } from '@interfaces/ssr-component';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { StoreProps } from './index.stores';
import stores from './index.stores';

type Props = StoreProps;

/**
 * Users list page
 * @constructor
 */
const Users: SSRComponent<Props> = ({
  pageStore: {
    entities,
    tableState: { page, pageSize, totalCount },
    addSubscribe,
    setPage,
    setPageSize,
    setOrderBy,
    setFilter,
  },
}) => {
  const { t } = useTranslation(['users-page', 'menu']);

  useEffect(() => {
    const disposer = addSubscribe();

    return () => disposer();
  }, [addSubscribe]);

  const columns: Column<IUser>[] = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        filterParams: {
          castType: JQFieldType.text,
        },
      },
      {
        Header: t('users-page:firstName'),
        accessor: 'firstName',
      },
      {
        Header: t('users-page:lastName'),
        accessor: 'lastName',
      },
      {
        Header: t('users-page:middleName'),
        accessor: 'middleName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: t('users-page:phone'),
        accessor: 'phone',
      },
      {
        Header: t('users-page:createdAt'),
        accessor: 'createdAt',
      },
      {
        Header: t('users-page:updatedAt'),
        accessor: 'updatedAt',
      },
    ],
    [t],
  );

  return (
    <div className="wrapper">
      <Helmet>
        <title>{t('users-page:pageTitle')}</title>
      </Helmet>
      <Breadcrumbs>
        <Breadcrumbs.Item to={ROUTE.USERS.URL} title={t('menu:users')} />
      </Breadcrumbs>
      <Table<IUser>
        columns={columns}
        data={entities}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPage={setPage}
        onFilter={setFilter}
        onSortBy={setOrderBy}
        page={page}
        count={totalCount}
        onRoute={(id) => makeURL('USER', { id })}
      />
    </div>
  );
};

Users.getInitialProps = InitialProps(async ({ pageStore: { getUsers } }) => {
  await getUsers();
}, stores);

export default Users;
