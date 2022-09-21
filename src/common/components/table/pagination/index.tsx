import {
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiChevronLeft,
  mdiChevronRight,
} from '@mdi/js';
import type { FC } from 'react';
import React from 'react';
import type { ReactPaginateProps } from 'react-paginate';
import ReactPaginate from 'react-paginate';
import Select from '../select';
import Button from './button';
import styles from './styles.module.scss';

interface IPagination {
  page: number;
  size: number;
  count: number;
  setPage: (selected: number) => void;
  onChangePageSize: (size: number) => void;
}

const Pagination: FC<IPagination> = ({ page, size, count, setPage, onChangePageSize }) => {
  const pageCount = Math.ceil(count / size);

  const onStartPage = () => setPage(1);

  const onLastPage = () => setPage(pageCount);

  const onPreviousPage = () => setPage(page - 1);

  const onNextPage = () => setPage(page + 1);

  const onPageChange: ReactPaginateProps['onPageChange'] = ({ selected }) => setPage(selected + 1);

  const isDisabledFirsts = page === 1;

  const isDisabledLasts = page >= pageCount;

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.buttons}>
        <Button
          iconPath={mdiChevronDoubleLeft}
          isDisabled={isDisabledFirsts}
          onClick={onStartPage}
        />
        <Button iconPath={mdiChevronLeft} isDisabled={isDisabledFirsts} onClick={onPreviousPage} />
        <ReactPaginate
          forcePage={page - 1}
          className={styles.itemPagination}
          nextLabel={null}
          previousLabel={null}
          breakLabel="..."
          pageRangeDisplayed={5}
          pageCount={pageCount}
          activeClassName={styles.itemPaginationActive}
          onPageChange={onPageChange}
        />
        <Button iconPath={mdiChevronRight} isDisabled={isDisabledLasts} onClick={onNextPage} />
        <Button
          iconPath={mdiChevronDoubleRight}
          isDisabled={isDisabledLasts}
          onClick={onLastPage}
        />
      </div>
      <Select pageSize={size} setPageSize={onChangePageSize} />
    </div>
  );
};

export default React.memo(Pagination);
