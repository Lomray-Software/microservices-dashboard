import type { FCC } from '@lomray/client-helpers/interfaces/fc-with-children';
import React from 'react';
import styles from './styles.module.scss';

const ErrorMessage: FCC = ({ children }) => <span className={styles.errorMessage}>{children}</span>;

export default ErrorMessage;
