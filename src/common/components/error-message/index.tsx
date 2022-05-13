import React, { FC } from 'react';
import styles from './styles.module.scss';

const ErrorMessage: FC = ({ children }) => <span className={styles.errorMessage}>{children}</span>;

export default ErrorMessage;
