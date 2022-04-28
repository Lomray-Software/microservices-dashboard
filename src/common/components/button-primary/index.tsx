/* eslint-disable react/button-has-type */
import React, { FC } from 'react';

export interface IButtonPrimary extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Primary button
 * @constructor
 */
const ButtonPrimary: FC<IButtonPrimary> = ({ type, ...props }) => <button type={type} {...props} />;

export default ButtonPrimary;
