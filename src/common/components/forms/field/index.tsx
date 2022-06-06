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
  title?: string;
  isInline?: boolean;
}

type TProps = InputHTMLAttributes<HTMLInputElement> & IField;

/**
 * Formik input
 */
const Field: FC<TProps> = ({ name, title, isInline = false, ...props }) => (
  <Label
    htmlFor={name}
    className={combineCss(styles.container, isInline ? styles.containerLine : '')}>
    {title && <span className={styles.description}>{title}</span>}
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
            name={name}
            {...props}
          />
          <ErrorMessage name={name} />
        </div>
      )}
    </DefaultField>
  </Label>
);

export default Field;
