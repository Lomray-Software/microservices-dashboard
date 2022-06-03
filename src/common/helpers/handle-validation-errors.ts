import i18n from 'i18next';
import ucfirst from '@helpers/ucfirst';
import type { IBaseException } from '@store/endpoints/interfaces/common/microservice';

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
 * Set errors for fields and main error
 */
const setErrorForm = <TFormValue>(
  result: IValidationErrors<TFormValue> | boolean,
  setErrors: (errors: Partial<TFormValue>) => void,
  setError: (message?: string | null) => void,
): void => {
  if (typeof result === 'boolean') {
    return;
  }

  const { fields, message } = result;

  if (fields) {
    setErrors(fields);
  } else {
    setError(message);
  }
};

export { setErrorForm, formatValidationError };