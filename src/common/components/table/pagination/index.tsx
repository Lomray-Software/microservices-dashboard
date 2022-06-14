import type { FC } from 'react';
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';

interface IPagination {
  page: number;
  size: number;
  count: number;
  handlePagination: (selected: number) => void;
}

const Pagination: FC<IPagination> = ({ page, size, count, handlePagination }) => (
  <ReactPaginate
    forcePage={page - 1}
    className={styles.itemPagination}
    nextLabel={null}
    previousLabel={null}
    breakLabel="..."
    pageRangeDisplayed={size}
    pageCount={count}
    activeClassName={styles.itemPaginationActive}
    onPageChange={({ selected }) => handlePagination(selected)}
  />
);

export default Pagination;
