import type { IBaseException } from '@lomray/microservices-types';
import type { FormikHelpers } from 'formik/dist/types';
import i18n from 'i18next';
import { Store } from 'react-notifications-component';
import ucfirst from '@helpers/ucfirst';
import translation from '@services/localization';

export interface IValidationErrors<TFormValue> {
  fields?: Partial<TFormValue>;
  message?: string;
}

/**
 * Convert API validation error response to key value object
 * Use in formik (setErrors)
 */
const formatValidationError = <TFormValue, TResValues>(
  error: IBaseException | IBaseException[],
  map: Partial<Record<keyof TResValues, keyof TFormValue>> = {},
): IValidationErrors<TFormValue> => {
  const groupErrors = !Array.isArray(error) ? [error] : error;
  const fields = groupErrors.reduce((errRes: Partial<TFormValue>, err) => {
    if (err?.status !== 422 || !Array.isArray(err?.payload)) {
      return errRes;
    }

    return {
      ...(errRes ?? {}),
      ...err.payload.reduce(
        (res, { property, constraints }) => ({
          ...res,
          [map?.[property] ?? property]: ucfirst(
            Object.values(constraints)?.[0]
              // remove field name from begin
              .replace(new RegExp(`^${property} `), ''),
            i18n.language,
          ),
        }),
        {},
      ),
    };
  }, undefined);

  return { fields, message: fields === undefined ? groupErrors?.[0]?.message : undefined };
};

/**
 * Set errors for fields and main error also adding notification for success
 */
const handleStateForm = <TFormValue>(
  result: IValidationErrors<TFormValue> | boolean,
  values: TFormValue,
  helpers: {
    setError: (message?: string | null) => void;
    setErrors: (errors: Partial<TFormValue>) => void;
    resetForm: FormikHelpers<TFormValue>['resetForm'];
  },
): void => {
  const { resetForm, setErrors, setError } = helpers;

  if (typeof result === 'boolean') {
    Store.addNotification({
      title: translation.t('translation:titleNotification'),
      message: translation.t('translation:messageNotification'),
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
      slidingExit: {
        duration: 200,
        timingFunction: 'ease-out',
        delay: 0,
      },
    });

    resetForm({ values });

    return;
  }

  const { fields, message } = result;

  if (fields) {
    setErrors(fields);
  } else {
    setError(message);
  }
};

export { handleStateForm, formatValidationError };
