import Icon from '@mdi/react';
import type { FC } from 'react';
import React from 'react';
import combineCss from '@helpers/combine-css';
import styles from './styles.module.scss';

interface IButton {
  iconPath: string;
  isDisabled: boolean;
  onClick: () => void;
}

const Button: FC<IButton> = ({ iconPath, isDisabled, onClick }) => (
  <button
    className={combineCss(styles.button, isDisabled ? styles.disable : '')}
    type="button"
    onClick={onClick}
    disabled={isDisabled}>
    <Icon path={iconPath} size={1} color="#8f5fe8" />
  </button>
);

export default Button;
