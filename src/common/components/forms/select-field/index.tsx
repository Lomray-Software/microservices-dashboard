import type { FieldProps } from 'formik';
import { Field as DefaultField } from 'formik';
import type { FC } from 'react';
import React from 'react';
import Select from 'react-select';
import combineCss from '@helpers/combine-css';
import type { ISelectOptions } from '@interfaces/select-options';
import ErrorMessage from '../error-message';
import Label from '../label';
import colourStyles from './styles';
import styles from './styles.module.scss';

interface ISelectField {
  name: string;
  options: ISelectOptions[];
  title?: string;
  isInline?: boolean;
}

/**
 * Formik input
 */
const SelectField: FC<ISelectField> = ({ name, options, title, isInline = false }) => (
  <Label
    htmlFor={name}
    className={combineCss(styles.container, isInline ? styles.containerLine : '')}>
    {title && <span className={styles.description}>{title}</span>}
    <DefaultField name={name}>
      {({ field: { value }, form: { setFieldValue }, meta: { initialValue } }: FieldProps) => {
        const placeholder = options.find((option) => option.value === value);

        return (
          <div className={styles.wrapperInput}>
            <Select
              styles={colourStyles}
              isClearable
              isSearchable={false}
              options={options}
              onChange={(option) => setFieldValue(name, option.value)}
              value={value ?? initialValue ?? ''}
              name={name}
              placeholder={placeholder?.label}
              className={styles.containerSelect}
            />
            <ErrorMessage name={name} />
          </div>
        );
      }}
    </DefaultField>
  </Label>
);

export default SelectField;
