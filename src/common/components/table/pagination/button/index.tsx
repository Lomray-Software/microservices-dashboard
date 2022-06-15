import Icon from '@mdi/react';
import type { FC } from 'react';
import React from 'react';
import ButtonPrimary from '@components/button-primary';

interface IButton {
  iconPath: string;
  isDisabled: boolean;
  onClick: () => void;
}

const Button: FC<IButton> = ({ iconPath, isDisabled, onClick }) => (
  <ButtonPrimary kind="secondary" type="button" onClick={onClick} disabled={isDisabled}>
    <Icon path={iconPath} size={1.2} color="#8f5fe8" />
  </ButtonPrimary>
);

export default Button;
