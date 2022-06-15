/* eslint-disable react/button-has-type */
import type { FC } from 'react';
import React from 'react';
import styles from './styles.module.scss';

export interface IButtonPrimary extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  kind?: 'primary' | 'secondary';
}

/**
 * Primary button
 * @constructor
 */
const ButtonPrimary: FC<IButtonPrimary> = ({ type, kind = 'primary', ...props }) => (
  <button type={type} className={styles.button} data-kind={kind} {...props} />
);

export default ButtonPrimary;
