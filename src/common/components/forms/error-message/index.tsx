import type { ErrorMessageProps } from 'formik';
import { ErrorMessage as DefaultErrorMessage } from 'formik';
import type { FC } from 'react';
import React from 'react';
import styles from './styles.module.scss';

const ErrorMessage: FC<ErrorMessageProps> = ({ name, ...props }) => (
  <DefaultErrorMessage
    name={String(name)}
    render={(errorMessage) => <span className={styles.errorMessage}>{errorMessage}</span>}
    {...props}
  />
);

export default ErrorMessage;
