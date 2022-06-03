import type { FieldProps } from 'formik';
import { Field as DefaultField } from 'formik';
import type { FC, InputHTMLAttributes } from 'react';
import React from 'react';
import combineCss from '@helpers/combine-css';
import ErrorMessage from '../error-message';
import Input from '../input';
import Label from '../label';
import styles from './styles.module.scss';

interface IField {
  name: string;
  isLine?: boolean;
}

type TProps = InputHTMLAttributes<HTMLInputElement> & IField;

/**
 * Formik input
 */
const Field: FC<TProps> = ({ name, children, isLine = false, ...props }) => (
  <Label
    htmlFor={name}
    className={combineCss(styles.container, isLine ? styles.containerLine : '')}>
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
