import type { FC } from 'react';
import React from 'react';
import styles from './styles.module.scss';

interface IErrorMessage {
  kind?: 'primary' | 'secondary';
}

const ErrorMessage: FC<IErrorMessage> = ({ kind = 'primary', children }) => (
  <span className={styles.errorMessage} data-kind={kind}>
    {children}
  </span>
);

export default ErrorMessage;
