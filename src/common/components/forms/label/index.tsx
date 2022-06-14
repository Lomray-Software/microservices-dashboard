import type { FC, LabelHTMLAttributes } from 'react';
import React from 'react';
import styles from './styles.module.scss';

type TProps = LabelHTMLAttributes<HTMLLabelElement>;

/**
 * Custom label
 */
const Label: FC<TProps> = ({ children, ...props }) => (
  <label className={styles.title} {...props}>
    {children}
  </label>
);

export default Label;
