import type { FieldProps } from 'formik';
import { Field as DefaultField } from 'formik';
import type { FC, InputHTMLAttributes } from 'react';
import React from 'react';
import ErrorMessage from '@components/forms/error-message';
import Label from '@components/forms/label';
import combineCss from '@helpers/combine-css';
import Input from '../input';
import styles from './styles.module.scss';

interface IFormikField {
  isColumn?: boolean;
  name: string;
}

/**
 * Formik input
 */
const Field: FC<InputHTMLAttributes<HTMLInputElement> & IFormikField> = ({
  name,
  children,
  isColumn = false,
  ...props
}) => (
  <Label
    htmlFor={name}
    className={combineCss(styles.container, isColumn ? styles.containerColumn : '')}>
    {children}
    <DefaultField name={name}>
      {({
        field: { value },
        form: { handleChange, handleBlur },
        meta: { initialValue },
      }: FieldProps) => (
        <Input
          onChange={handleChange(name)}
          onBlur={handleBlur(String(name))}
          value={value ?? initialValue}
          {...props}
        />
      )}
    </DefaultField>
    <ErrorMessage name={name} />
  </Label>
);

export default Field;
