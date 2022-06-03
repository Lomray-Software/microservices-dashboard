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
  isInline?: boolean;
}

type TProps = InputHTMLAttributes<HTMLInputElement> & IField;

/**
 * Formik input
 */
const Field: FC<TProps> = ({ name, children, isInline = false, ...props }) => (
  <Label
    htmlFor={name}
    className={combineCss(styles.container, isInline ? styles.containerLine : '')}>
    {children}
    <DefaultField name={name}>
      {({
        field: { value },
        form: { handleChange, handleBlur },
        meta: { initialValue },
      }: FieldProps) => (
        <div className={styles.wrapperInput}>
          <Input
            onChange={handleChange(name)}
            onBlur={handleBlur(String(name))}
            value={value ?? initialValue}
            {...props}
          />
          <ErrorMessage name={name} />
        </div>
      )}
    </DefaultField>
  </Label>
);

export default Field;
