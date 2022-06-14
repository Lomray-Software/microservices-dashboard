import type { FC } from 'react';
import React from 'react';
import Field from '../field';
import type { ISelectOptions } from '../select-field';
import SelectField from '../select-field';

export interface IField {
  name: string;
  title: string;
  type?: string;
  options?: ISelectOptions[];
}

export interface IFields {
  fields: IField[];
  isInline?: boolean;
}

const Fields: FC<IFields> = ({ fields, isInline }) => (
  <>
    {fields.map(({ name, title, options, type = 'text', ...field }) => {
      switch (type) {
        case 'select':
          return (
            <SelectField
              key={name}
              options={options}
              name={name}
              title={title}
              isInline={isInline}
            />
          );

        case 'password':
        case 'date':
        case 'text':
        default:
          return (
            <Field
              key={name}
              type={type}
              name={name}
              title={title}
              placeholder={title}
              isInline={isInline}
              {...field}
            />
          );
      }
    })}
  </>
);

export default Fields;
