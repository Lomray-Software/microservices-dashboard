import {
  mdiSortDescending,
  mdiSortAscending,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiChevronLeft,
  mdiChevronRight,
} from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import ReactPaginate from 'react-paginate';
import type { TableOptions } from 'react-table';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import Link from '@components/link';
import DefaultFilter from '@components/table/default-filter';
import Select from '@components/table/select';
import ROUTES from '@constants/routes';
import { makeUrl } from '@helpers/make-url';
import styles from './styles.module.scss';

interface ITable<TEntity extends Record<string, any>> extends TableOptions<TEntity, any> {}

const Table = <TEntity extends Record<string, any>>(props: ITable<TEntity>): JSX.Element => {
  const { columns, data } = props;

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageSize, pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetSortBy: false,
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <table {...getTableProps()} className={styles.table}>
          <thead className={styles.head}>
            {headerGroups.map((headerGroup) => {
              const rowProps = headerGroup.getHeaderGroupProps();

              return (
                <tr {...rowProps} key={rowProps.key}>
                  {headerGroup.headers.map((column) => {
                    const cellProps = column.getHeaderProps(column.getSortByToggleProps());

                    return (
                      <th scope="col" key={cellProps.key}>
                        <div {...cellProps} className={styles.wrapperSort}>
                          {column.render('Header')}
                          <span className={styles.wrapperIconSort}>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <Icon path={mdiSortDescending} size={1} color="#6c7293" />
                              ) : (
                                <Icon path={mdiSortAscending} size={1} color="#6c7293" />
                              )
                            ) : (
                              ''
                            )}
                          </span>
                        </div>
                        <div>{column.canFilter ? column.render('Filter') : ''}</div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className={styles.body} {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              const rowProps = row.getRowProps();

              return (
                <tr {...rowProps} key={rowProps.key}>
                  {row.cells.map((cell) => {
                    const cellProps = cell.getCellProps();

                    return (
                      <td {...cellProps} key={cellProps.key}>
                        <Link
                          className={styles.link}
                          to={makeUrl([makeUrl([ROUTES.USERS, String(row.original.id)])])}>
                          {cell.render('Cell')}
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}>
            <Icon path={mdiChevronDoubleLeft} size={1} color="#8f5fe8" />
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={previousPage}
            disabled={!canPreviousPage}>
            <Icon path={mdiChevronLeft} size={1} color="#8f5fe8" />
          </button>
          <ReactPaginate
            forcePage={pageIndex}
            className={styles.itemPagination}
            nextLabel={null}
            previousLabel={null}
            breakLabel="..."
            pageRangeDisplayed={pageSize}
            pageCount={Math.ceil(data.length / pageSize)}
            activeClassName={styles.itemPaginationActive}
            onPageChange={({ selected }) => gotoPage(selected)}
          />
          <button
            className={styles.button}
            type="button"
            onClick={nextPage}
            disabled={!canNextPage}>
            <Icon path={mdiChevronRight} size={1} color="#8f5fe8" />
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}>
            <Icon path={mdiChevronDoubleRight} size={1} color="#8f5fe8" />
          </button>
        </div>
        <Select pageSize={pageSize} setPageSize={setPageSize} />
      </div>
    </div>
  );
};

export default Table;
