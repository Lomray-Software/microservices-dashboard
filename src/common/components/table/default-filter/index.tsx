import type { FC } from 'react';
import React from 'react';
import type { UseFiltersColumnProps } from 'react-table';
import styles from './styles.module.scss';

interface IDefaultFilter {
  column: UseFiltersColumnProps<Record<string, any>>;
}

const DefaultFilter: FC<IDefaultFilter> = ({ column: { filterValue, setFilter } }): JSX.Element => (
  <input
    className={styles.input}
    type="text"
    value={filterValue || ''}
    onChange={(e) => setFilter(e.target.value)}
  />
);

export default DefaultFilter;
