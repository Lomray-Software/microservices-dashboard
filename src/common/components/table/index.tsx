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
import combineCss from '@helpers/combine-css';
import DefaultFilter from './default-filter';
import Select from './select';
import styles from './styles.module.scss';

interface ITable<TEntity extends Record<string, any>> extends TableOptions<TEntity, any> {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (count: number) => void;
  onRoute: (id: string) => string;
  count: number;
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
    onRoute,
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
    setPage(currentPage - 1);
  };

  const onNextPage = () => {
    nextPage();
    setPage(currentPage + 1);
  };

  const styleColumn = {
    gridTemplateColumns: `repeat(${columns.length}, minmax(150px, 1fr))`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <div {...getTableProps()} className={styles.table}>
          {headerGroups.map((headerGroup) => {
            const rowProps = headerGroup.getHeaderGroupProps();

            return (
              <div className={styles.head} {...rowProps} key={rowProps.key} style={styleColumn}>
                {headerGroup.headers.map((column) => {
                  const cellProps = column.getHeaderProps(column.getSortByToggleProps());

                  return (
                    <div className={styles.headerItem} key={cellProps.key}>
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
                <div className={styles.row} {...rowProps} key={rowProps.key} style={styleColumn}>
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
