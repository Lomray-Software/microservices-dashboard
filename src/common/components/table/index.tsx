import Link from '@lomray/afterjs-helpers/components/link';
import type { IJsonQuery } from '@lomray/microservices-types';
import type { ReactElement } from 'react';
import React, { useCallback, useMemo } from 'react';
import type { TableOptions } from 'react-table';
import { usePagination, useTable, useExpanded } from 'react-table';
import combineCss from '@helpers/combine-css';
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

const Table = <TEntity extends Record<string, any>>({
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
}: ITable<TEntity>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
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

  const gridStyle = useMemo(
    () => ({ gridTemplateColumns: templatesForColumns }),
    [templatesForColumns],
  );

  const onChangePageSize = useCallback(
    (size: number) => {
      setStorePageSize(size);
      setPageSize(size);
      setPage(1);
    },
    [setPage, setPageSize, setStorePageSize],
  );

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <div {...getTableProps()} className={styles.table}>
          {headerGroups.map((headerGroup) => {
            const rowProps = headerGroup.getHeaderGroupProps();

            return (
              <div className={styles.head} {...rowProps} style={gridStyle} key={rowProps.key}>
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
                  style={gridStyle}
                >
                  {row.cells.map((cell) => {
                    const cellProps = cell.getCellProps();

                    return onRoute ? (
                      <Link
                        className={styles.cell}
                        {...cellProps}
                        key={cellProps.key}
                        to={onRoute(String(row.original.id))}
                      >
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
        count={count}
        setPage={setPage}
        onChangePageSize={onChangePageSize}
      />
    </div>
  );
};

export default Table;
