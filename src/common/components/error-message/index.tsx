import React from 'react';
import type { FCC } from '@interfaces/fc-with-children';
import styles from './styles.module.scss';

const ErrorMessage: FCC = ({ children }) => <span className={styles.errorMessage}>{children}</span>;

export default ErrorMessage;
