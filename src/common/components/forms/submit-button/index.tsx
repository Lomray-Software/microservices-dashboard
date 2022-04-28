import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import type { IButtonPrimary } from '@components/button-primary';
import ButtonPrimary from '@components/button-primary';

interface ISubmitButton extends Omit<IButtonPrimary, 'onPress'> {
  isInitialDisabled?: boolean;
}

/**
 * Form submit button
 * @constructor
 */
const SubmitButton: FC<ISubmitButton> = ({ isInitialDisabled, ...props }) => {
  const { isSubmitting, isValid, dirty: isDirty } = useFormikContext();

  const isDisabled = isSubmitting || (isInitialDisabled ? !(isValid && isDirty) : !isValid);

  return <ButtonPrimary type="submit" disabled={isDisabled} {...props} />;
};

export default SubmitButton;
