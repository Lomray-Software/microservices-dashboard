import { useFormikContext } from 'formik';
import type { FC } from 'react';
import React from 'react';
import type { IButtonPrimary } from '@components/button-primary';
import ButtonPrimary from '@components/button-primary';
import Spinner from '@components/loaders/spinner';
import combineCss from '@helpers/combine-css';

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
  const { isSubmitting, isValid, dirty: isDirty, status } = useFormikContext();

  console.log({ status });

  const isDisabled = isSubmitting || (isInitialDisabled ? !(isValid && isDirty) : !isValid);

  return (
    <ButtonPrimary
      type="submit"
      disabled={isDisabled}
      className={combineCss(String(props.className))}
      {...props}>
      {hasLoader && isSubmitting ? <Spinner /> : children}
    </ButtonPrimary>
  );
};

export default SubmitButton;
