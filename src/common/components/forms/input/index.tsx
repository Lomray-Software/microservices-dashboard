import type { FC, InputHTMLAttributes } from 'react';
import React from 'react';
import combineCss from '@helpers/combine-css';
import styles from './styles.module.scss';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  additionalStyles?: string;
}

/**
 * Form text input
 * @constructor
 */
const Input: FC<IInput> = ({ additionalStyles, name, children, ...props }) => (
  <label htmlFor={name} className={styles.label}>
    <input className={combineCss(styles.input, additionalStyles || '')} {...props} />
    {children}
  </label>
);

export default Input;
