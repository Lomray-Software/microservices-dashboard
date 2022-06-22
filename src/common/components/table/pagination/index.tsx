import {
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiChevronLeft,
  mdiChevronRight,
} from '@mdi/js';
import type { FC } from 'react';
import React from 'react';
import ReactPaginate from 'react-paginate';
import Select from '../select';
import Button from './button';
import styles from './styles.module.scss';

interface IPagination {
  page: number;
  size: number;
  count: number;
  handlePagination: (selected: number) => void;
  onStartPage: () => void;
  onPreviousPage: () => void;
  onLastPage: () => void;
  onNextPage: () => void;
  onChangePageSize: (size: number) => void;
}

const Pagination: FC<IPagination> = ({
  page,
  size,
  count,
  handlePagination,
  onStartPage,
  onPreviousPage,
  onLastPage,
  onChangePageSize,
  onNextPage,
}) => (
  <div className={styles.pagination}>
    <div className={styles.buttons}>
      <Button iconPath={mdiChevronDoubleLeft} isDisabled={1 === page} onClick={onStartPage} />
      <Button iconPath={mdiChevronLeft} isDisabled={1 === page} onClick={onPreviousPage} />
      <ReactPaginate
        forcePage={page}
        className={styles.itemPagination}
        nextLabel={null}
        previousLabel={null}
        breakLabel="..."
        pageRangeDisplayed={size}
        pageCount={count}
        activeClassName={styles.itemPaginationActive}
        onPageChange={({ selected }) => handlePagination(selected)}
      />
      <Button iconPath={mdiChevronRight} isDisabled={count <= page} onClick={onNextPage} />
      <Button iconPath={mdiChevronDoubleRight} isDisabled={count <= page} onClick={onLastPage} />
    </div>
    <Select pageSize={size} setPageSize={onChangePageSize} />
  </div>
);

export default Pagination;
