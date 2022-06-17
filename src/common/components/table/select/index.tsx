import type { FC } from 'react';
import React from 'react';
import type { OnChangeValue } from 'react-select';
import DefaultSelect from 'react-select';
import type { ISelectOptions } from '@components/forms/select-field';
import { options, colourStyles } from './data';
import styles from './styles.module.scss';

interface ISelect {
  pageSize: number;
  setPageSize: (value: number) => void;
}

const Select: FC<ISelect> = ({ pageSize, setPageSize }) => {
  const handleChange = (option: OnChangeValue<ISelectOptions, false>) =>
    setPageSize(Number(option?.value));

  return (
    <DefaultSelect
      styles={colourStyles}
      isSearchable={false}
      options={options}
      onChange={handleChange}
      placeholder={pageSize}
      className={styles.containerSelect}
    />
  );
};

export default Select;
