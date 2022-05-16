import type { FieldProps } from 'formik';
import { ErrorMessage, Field } from 'formik';
import type { FC } from 'react';
import React from 'react';
import type { IInput } from './index';
import DefaultInput from './index';
import styles from './styles.module.scss';

type IFormikInput = IInput & { name: string };

/**
 * Formik input
 */
const FormikField: FC<IFormikInput> = ({ name, ...props }) => (
  <Field name={name}>
    {({
      field: { value },
      form: { handleChange, handleBlur },
      meta: { initialValue },
    }: FieldProps) => (
      <DefaultInput
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value ?? initialValue}
        {...props}>
        <span className={styles.errorMessage}>
          <ErrorMessage name={String(name)} />
        </span>
      </DefaultInput>
    )}
  </Field>
);

export default FormikField;
