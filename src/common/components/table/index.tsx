import React, { useCallback } from 'react';
import type { TableOptions } from 'react-table';
import { usePagination, useTable } from 'react-table';
import Link from '@components/link';
import DefaultFilter from './default-filter';
import Pagination from './pagination';
import SortBy from './sort-by';
import styles from './styles.module.scss';

interface ITable<TEntity extends Record<string, any>> extends TableOptions<TEntity, any> {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (count: number) => void;
  onFilter: (name: string, value: string) => void;
  onRoute: (id: string) => string;
  count: number;
}

const Table = <TEntity extends Record<string, any>>(props: ITable<TEntity>): JSX.Element => {
  const {
    columns,
    data,
    pageSize,
    page: storePage,
    count,
    onFilter,
    setPageSize: setStorePageSize,
    onSortBy,
    setPage,
    onRoute,
  } = props;

  const pageCount = Math.ceil(count / pageSize);

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
      autoResetRowState: true,
      autoResetSortBy: false,
      initialState: { pageSize },
    },
    usePagination,
  );

  const onChangePageSize = useCallback(
    (size: number) => {
      setStorePageSize(size);
      setPageSize(size);
      setPage(1);
    },
    [setPage, setPageSize, setStorePageSize],
  );

  const onPaginationChange = useCallback(
    (sheet: number) => {
      setPage(sheet + 1);
      gotoPage(sheet);
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
    setPage(storePage - 1);
  };

  const onNextPage = () => {
    nextPage();
    setPage(storePage + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <div {...getTableProps()} className={styles.table}>
          {headerGroups.map((headerGroup) => {
            const rowProps = headerGroup.getHeaderGroupProps();

            return (
              <div
                className={styles.head}
                {...rowProps}
                key={rowProps.key}
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, 200px)`,
                }}>
                {headerGroup.headers.map((column) => {
                  const cellProps = column.getHeaderProps();

                  return (
                    <div className={styles.headerItem} key={cellProps.key}>
                      <div {...cellProps} className={styles.wrapperSort}>
                        {column.render('Header')}
                        <SortBy id={column.id} onChange={onSortBy} />
                      </div>
                      <DefaultFilter onFilter={onFilter} name={column.id} />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className={styles.body} {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              const rowProps = row.getRowProps();

              return (
                <div
                  className={styles.row}
                  {...rowProps}
                  key={rowProps.key}
                  style={{
                    gridTemplateColumns: `repeat(${columns.length}, 200px)`,
                  }}>
                  {row.cells.map((cell) => {
                    const cellProps = cell.getCellProps();

                    return (
                      <Link
                        className={styles.link}
                        {...cellProps}
                        key={cellProps.key}
                        to={onRoute(String(row.original.id))}>
                        {cell.render('Cell')}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Pagination
        page={storePage}
        size={pageSize}
        count={pageCount}
        handlePagination={onPaginationChange}
        onStartPage={onStartPage}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onLastPage={onLastPage}
        onChangePageSize={onChangePageSize}
      />
    </div>
  );
};

export default Table;
