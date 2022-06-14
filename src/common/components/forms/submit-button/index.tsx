import { useFormikContext } from 'formik';
import type { FC } from 'react';
import React from 'react';
import type { IButtonPrimary } from '@components/button-primary';
import ButtonPrimary from '@components/button-primary';
import Spinner from '@components/loaders/spinner';
import styles from './styles.module.scss';

interface ISubmitButton extends Omit<IButtonPrimary, 'onPress'> {
  isInitialDisabled?: boolean;
  hasLoader?: boolean;
}

/**
 * Form submit button
 * @constructor
 */
const SubmitButton: FC<ISubmitButton> = ({
  isInitialDisabled,
  children,
  hasLoader = false,
  ...props
}) => {
  const { isSubmitting, isValid, dirty: isDirty } = useFormikContext();

  const isDisabled = isSubmitting || (isInitialDisabled ? !(isValid && isDirty) : !isValid);

  return (
    <ButtonPrimary type="submit" disabled={isDisabled} className={styles.button} {...props}>
      {hasLoader && isSubmitting ? <Spinner /> : children}
    </ButtonPrimary>
  );
};

export default SubmitButton;
