import { useFormikContext } from 'formik';
import type { FC } from 'react';
import React from 'react';
import type { IButtonPrimary } from '@components/button-primary';
import ButtonPrimary from '@components/button-primary';
import ErrorMessage from '@components/error-message';
import Spinner from '@components/loaders/spinner';
import styles from './styles.module.scss';

interface ISubmitButton extends Omit<IButtonPrimary, 'onPress'> {
  error: string | null;
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
  error,
  hasLoader = false,
  ...props
}) => {
  const { isSubmitting, isValid, dirty: isDirty } = useFormikContext();

  const isDisabled = isSubmitting || (isInitialDisabled ? !(isValid && isDirty) : !isValid);

  return (
    <div className={styles.wrapperButton}>
      <ErrorMessage>{error}</ErrorMessage>
      <ButtonPrimary type="submit" disabled={isDisabled} {...props}>
        {hasLoader && isSubmitting ? <Spinner /> : children}
      </ButtonPrimary>
    </div>
  );
};

export default SubmitButton;
