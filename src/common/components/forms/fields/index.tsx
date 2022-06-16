import type { FC } from 'react';
import React from 'react';
import i18n from '@services/localization';
import type { TranslationDictionary } from '@services/localization';
import Field from '../field';
import type { ISelectOptions } from '../select-field';
import SelectField from '../select-field';

export interface IField {
  name: string;
  title: TranslationDictionary;
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
              title={i18n.t(title)}
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
              title={i18n.t(title)}
              placeholder={i18n.t(title)}
              isInline={isInline}
              {...field}
            />
          );
      }
    })}
  </>
);

export default Fields;
