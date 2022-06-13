import type { ChangeEvent, FC } from 'react';
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface IDefaultFilter {
  id: string;
  onFilter: (where: string, substring: string) => void;
}

const DefaultFilter: FC<IDefaultFilter> = ({ onFilter, id }): JSX.Element => {
  const [value, setValue] = useState('');

  const handeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    onFilter(id, e.target.value);
  };

  return <input className={styles.input} type="text" value={value} onChange={handeChange} />;
};

export default DefaultFilter;
