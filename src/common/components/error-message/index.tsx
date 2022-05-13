import React, { FC } from 'react';
import styles from './styles.module.scss';

const ErrorMessage: FC<{ error: string | null }> = ({ error }) => (
  <span className={styles.errorMessage}>{error}</span>
);

export default ErrorMessage;
