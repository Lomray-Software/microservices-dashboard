import type { FC, InputHTMLAttributes } from 'react';
import React from 'react';
import styles from './styles.module.scss';

type TProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Form text input
 * @constructor
 */
const Input: FC<TProps> = ({ ...props }) => <input className={styles.input} {...props} />;

export default Input;
