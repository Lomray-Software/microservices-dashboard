import type { ReactElement } from 'react';
import React, { useCallback, useMemo } from 'react';
import type { TableOptions } from 'react-table';
import { usePagination, useTable, useExpanded } from 'react-table';
import Link from '@components/link';
import combineCss from '@helpers/combine-css';
import type { IJsonQuery } from '@store/endpoints/interfaces/common/query';
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
  onSortBy: (sortBy: IJsonQuery<TEntity>['orderBy']) => void;
  count: number;
  onRoute?: (id: string) => string;
  expandComponent?: (id: string) => ReactElement;
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
    expandComponent,
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
    toggleRowExpanded,
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
      autoResetRowState: true,
      autoResetSortBy: false,
      initialState: { pageSize },
      defaultColumn: { width: 200 },
    },
    useExpanded,
    usePagination,
  );

  /**
   * Create template for columns table
   * If no values are passed, it creates default templates
   */
  const templatesForColumns = useMemo(
    () =>
      headerGroups[0].headers.reduce(
        (acc, { maxWidth, width }) => `${acc}minmax(${String(width)}px, ${String(maxWidth)}px) `,
        '',
      ),
    [headerGroups],
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
                style={{
                  gridTemplateColumns: templatesForColumns,
                }}
                key={rowProps.key}>
                {headerGroup.headers.map((column) => {
                  const cellProps = column.getHeaderProps();

                  return (
                    <div className={styles.headerItem} key={cellProps.key}>
                      <div {...cellProps} className={styles.wrapperSort}>
                        {column.render('Header')}
                        {!column.disableSortBy && <SortBy id={column.id} setOrderBy={onSortBy} />}
                      </div>
                      {!column.disableFilters && (
                        <DefaultFilter
                          onFilter={onFilter}
                          name={column.id}
                          extraParams={column?.filterParams}
                        />
                      )}
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
              const isExpanded = expanded[row.id];

              return (
                <div
                  role="presentation"
                  className={combineCss(styles.row, isExpanded ? styles.expandedRow : '')}
                  {...rowProps}
                  onClick={toggleRowExpanded.bind(null, row.id, !row.isExpanded)}
                  key={rowProps.key}
                  style={{
                    gridTemplateColumns: templatesForColumns,
                  }}>
                  {row.cells.map((cell) => {
                    const cellProps = cell.getCellProps();

                    return onRoute ? (
                      <Link
                        className={styles.cell}
                        {...cellProps}
                        key={cellProps.key}
                        to={onRoute(String(row.original.id))}>
                        {cell.render('Cell')}
                      </Link>
                    ) : (
                      <div className={styles.cell} {...cellProps} key={cellProps.key}>
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                  {expandComponent && isExpanded && expandComponent(row.id)}
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
