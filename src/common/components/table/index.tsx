import {
  mdiSortDescending,
  mdiSortAscending,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiChevronLeft,
  mdiChevronRight,
} from '@mdi/js';
import Icon from '@mdi/react';
import React, { useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import type { TableOptions } from 'react-table';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import Link from '@components/link';
import type ROUTES from '@constants/routes';
import combineCss from '@helpers/combine-css';
import { makeUrl } from '@helpers/make-url';
import DefaultFilter from './default-filter';
import Select from './select';
import styles from './styles.module.scss';

interface ITable<TEntity extends Record<string, any>> extends TableOptions<TEntity, any> {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (count: number) => void;
  count: number;
  link: ROUTES;
}

const Table = <TEntity extends Record<string, any>>(props: ITable<TEntity>): JSX.Element => {
  const {
    columns,
    data,
    pageSize,
    setPageSize: setStorePageSize,
    page: currentPage,
    setPage,
    count,
    link,
  } = props;

  const pageCount = Math.ceil(count / pageSize);

  const defaultColumn = useMemo(
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
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetRowState: true,
      autoResetSortBy: false,
      initialState: { pageSize },
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  const onChangePageSize = useCallback(
    (countUser: number) => {
      setStorePageSize(countUser);
      setPageSize(countUser);
      setPage(1);
    },
    [setPage, setPageSize, setStorePageSize],
  );

  const onPaginationChange = useCallback(
    (selectedPage: number) => {
      setPage(selectedPage + 1);
      gotoPage(selectedPage);
    },
    [gotoPage, setPage],
  );

  const onStartPage = () => {
    gotoPage(1);
    setPage(1);
  };

  const onLastPage = () => {
    gotoPage(pageCount);
    setPage(pageCount);
  };

  const onPreviousPage = () => {
    previousPage();
    setPage(currentPage - 1);
  };

  const onNextPage = () => {
    nextPage();
    setPage(currentPage + 1);
  };

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
                        <Link className={styles.link} to={makeUrl([link, String(row.original.id)])}>
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
            className={combineCss(styles.button, 1 === currentPage ? styles.disable : '')}
            type="button"
            onClick={onStartPage}
            disabled={1 === currentPage}>
            <Icon path={mdiChevronDoubleLeft} size={1} color="#8f5fe8" />
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={onPreviousPage}
            disabled={1 === currentPage}>
            <Icon path={mdiChevronLeft} size={1} color="#8f5fe8" />
          </button>
          <ReactPaginate
            forcePage={currentPage - 1}
            className={styles.itemPagination}
            nextLabel={null}
            previousLabel={null}
            breakLabel="..."
            pageRangeDisplayed={pageSize}
            pageCount={pageCount}
            activeClassName={styles.itemPaginationActive}
            onPageChange={({ selected }) => onPaginationChange(selected)}
          />
          <button
            className={styles.button}
            type="button"
            onClick={onNextPage}
            disabled={pageCount === currentPage}>
            <Icon path={mdiChevronRight} size={1} color="#8f5fe8" />
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={onLastPage}
            disabled={pageCount === currentPage}>
            <Icon path={mdiChevronDoubleRight} size={1} color="#8f5fe8" />
          </button>
        </div>
        <Select pageSize={pageSize} setPageSize={onChangePageSize} />
      </div>
    </div>
  );
};

export default Table;
