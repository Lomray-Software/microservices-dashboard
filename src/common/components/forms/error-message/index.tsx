import type { ErrorMessageProps } from 'formik';
import { ErrorMessage as DefaultErrorMessage } from 'formik';
import type { FC } from 'react';
import React from 'react';
import CustomErrorMessage from '@components/error-message';

const ErrorMessage: FC<ErrorMessageProps> = ({ name, ...props }) => (
  <DefaultErrorMessage
    name={String(name)}
    render={(errorMessage) => <CustomErrorMessage>{errorMessage}</CustomErrorMessage>}
    {...props}
  />
);

export default ErrorMessage;
