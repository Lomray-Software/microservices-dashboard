import type { FC, LabelHTMLAttributes } from 'react';
import React from 'react';
import styles from './styles.module.scss';

/**
 * Custom label
 * @constructor
 */
const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...props }) => (
  <label className={styles.label} {...props}>
    {children}
  </label>
);

export default Label;
