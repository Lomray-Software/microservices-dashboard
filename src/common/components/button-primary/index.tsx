/* eslint-disable react/button-has-type */
import type { FC } from 'react';
import React from 'react';
import styles from './styles.module.scss';

export interface IButtonPrimary extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary';
}

/**
 * Primary button
 * @constructor
 */
const ButtonPrimary: FC<IButtonPrimary> = ({ type, color = 'primary', ...props }) => (
  <button type={type} className={styles.button} data-additional={color} {...props} />
);

export default ButtonPrimary;
