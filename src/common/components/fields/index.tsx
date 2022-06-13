import type { FC } from 'react';
import React from 'react';
import Field from '@components/forms/field';
import type { ISelectOptions } from '@components/forms/select-field';
import SelectField from '@components/forms/select-field';

export interface IEntityField {
  name: string;
  type: string;
  title: string;
  options?: ISelectOptions[];
}

export interface IFields {
  fields: IEntityField[];
  isInline?: boolean;
}

const Fields: FC<IFields> = ({ fields, isInline }) => (
  <>
    {fields.map(({ name, type, options, title, ...field }) => {
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
