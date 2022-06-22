import type { FieldProps } from 'formik';
import { Field as DefaultField } from 'formik';
import type { FC } from 'react';
import React from 'react';
import Select from 'react-select';
import combineCss from '@helpers/combine-css';
import i18n from '@services/localization';
import type { TranslationDictionary } from '@services/localization';
import ErrorMessage from '../error-message';
import Label from '../label';
import colourStyles from './styles';
import styles from './styles.module.scss';

export interface ISelectOptions {
  value: string | number;
  label: string | TranslationDictionary;
}

interface ISelectField {
  name: string;
  options?: ISelectOptions[];
  title?: string;
  isInline?: boolean;
}

/**
 * Select formik
 */
const SelectField: FC<ISelectField> = ({ name, options, title, isInline = false }) => (
  <Label
    htmlFor={name}
    className={combineCss(styles.container, isInline ? styles.containerLine : '')}>
    {title && <span className={styles.description}>{title}</span>}
    <DefaultField name={name}>
      {({ field: { value }, form: { setFieldValue }, meta: { initialValue } }: FieldProps) => {
        const { translatedOptions, placeholder } =
          options?.reduce(
            (res, option) => {
              res.translatedOptions.push({
                ...option,
                label: i18n.t(option.label as TranslationDictionary),
              });

              if (option.value === value) {
                res.placeholder = i18n.t(option.label as TranslationDictionary);
              }

              return res;
            },
            { translatedOptions: [] as ISelectOptions[], placeholder: '' },
          ) ?? {};

        return (
          <div className={styles.wrapperInput}>
            <Select
              styles={colourStyles}
              isClearable
              isSearchable={false}
              options={translatedOptions}
              onChange={(option) => setFieldValue(name, option.value)}
              value={value ?? initialValue ?? ''}
              name={name}
              instanceId={name}
              placeholder={placeholder}
              className={styles.containerSelect}
            />
            <div className={styles.wrapperErrorMessage}>
              <ErrorMessage name={name} />
            </div>
          </div>
        );
      }}
    </DefaultField>
  </Label>
);

export default SelectField;
