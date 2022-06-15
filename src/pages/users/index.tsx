import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import type { Column } from 'react-table';
import Breadcrumbs from '@components/breadcrumbs';
import Table from '@components/table';
import ROUTES from '@constants/routes';
import InitialProps from '@helpers/initial-props';
import makeRoute from '@helpers/make-route';
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
  pageStore: { users, setPageSize, pageSize, setPage, setWhere, count, page, setSortBy },
}) => {
  const { t } = useTranslation(['users-page', 'menu']);

  const columns: Column<IUser>[] = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
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
      {
        Header: t('users-page:deletedAt'),
        accessor: 'deletedAt',
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
        <Breadcrumbs.Item to={ROUTES.USERS} title={t('menu:users')} />
      </Breadcrumbs>
      <Table<IUser>
        columns={columns}
        data={users}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPage={setPage}
        onFilter={setWhere}
        onSortBy={setSortBy}
        page={page}
        count={count}
        onRoute={makeRoute(ROUTES.USERS)}
      />
    </div>
  );
};

Users.getInitialProps = InitialProps(async ({ pageStore: { getUsers } }) => {
  await getUsers();
}, stores);

export default Users;
