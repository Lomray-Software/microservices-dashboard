import debounce from 'lodash.debounce';
import type { ChangeEvent, FC } from 'react';
import React, { useMemo } from 'react';
import Input from '@components/forms/input';

interface IDefaultFilter {
  name: string;
  onFilter: (name: string, value: string) => void;
}

const DefaultFilter: FC<IDefaultFilter> = ({ onFilter, name }): JSX.Element => {
  const debounceFilter = useMemo(
    () => debounce((e: ChangeEvent<HTMLInputElement>) => onFilter(name, e.target.value), 500),
    [name, onFilter],
  );

  return <Input type="text" onChange={debounceFilter} />;
};

export default DefaultFilter;
