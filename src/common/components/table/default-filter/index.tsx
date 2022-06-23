import debounce from 'lodash.debounce';
import type { ChangeEvent, FC } from 'react';
import React, { useMemo } from 'react';
import type { HeaderGroup } from 'react-table';
import Input from '@components/forms/input';

interface IDefaultFilter {
  name: string;
  onFilter: (name: string, value: string, extraParams?: HeaderGroup['filterParams']) => void;
  extraParams?: HeaderGroup['filterParams'];
}

const DefaultFilter: FC<IDefaultFilter> = ({ onFilter, name, extraParams }): JSX.Element => {
  const debounceFilter = useMemo(
    () =>
      debounce(
        (e: ChangeEvent<HTMLInputElement>) => onFilter(name, e.target.value, extraParams),
        500,
      ),
    [extraParams, name, onFilter],
  );

  const { type = 'text' } = extraParams || {};

  return <Input type={type} onChange={debounceFilter} />;
};

export default DefaultFilter;
