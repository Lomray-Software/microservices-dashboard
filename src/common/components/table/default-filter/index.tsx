import type { ChangeEvent, FC } from 'react';
import React, { useState } from 'react';
import Input from '@components/forms/input';

interface IDefaultFilter {
  name: string;
  onFilter: (name: string, value: string) => void;
}

const DefaultFilter: FC<IDefaultFilter> = ({ onFilter, name }): JSX.Element => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onFilter(name, e.target.value);
  };

  return <Input value={value} onChange={handleChange} />;
};

export default DefaultFilter;
