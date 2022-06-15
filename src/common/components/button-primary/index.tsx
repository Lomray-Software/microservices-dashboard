/* eslint-disable react/button-has-type */
import type { FC } from 'react';
import React from 'react';
import styles from './styles.module.scss';

export interface IButtonPrimary extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  addition?: 'primary' | 'secondary';
}

/**
 * Primary button
 * @constructor
 */
const ButtonPrimary: FC<IButtonPrimary> = ({ type, addition = 'primary', ...props }) => (
  <button type={type} className={styles.button} data-additional={addition} {...props} />
);

export default ButtonPrimary;
