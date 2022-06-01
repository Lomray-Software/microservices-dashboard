import type { FC, InputHTMLAttributes } from 'react';
import React from 'react';
import styles from './styles.module.scss';

/**
 * Form text input
 * @constructor
 */
const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => (
  <input className={styles.input} {...props} />
);

export default Input;
