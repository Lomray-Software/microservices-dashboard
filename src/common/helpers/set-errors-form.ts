import type { FormikErrors } from 'formik';
import type { IValidationErrors } from '@helpers/format-validation-errors';
import type { IEditProfileState } from '@store/modules/pages/user/efit-profile';

/**
 * set errors for fields and main error
 */
const setErrorForm = (
  result: IValidationErrors<IEditProfileState> | true,
  setErrors: (errors: FormikErrors<IEditProfileState>) => void,
  setError: (message?: string | null) => void,
): void => {
  if (result === true) {
    return;
  }

  const { fields, message } = result;

  if (fields) {
    setErrors(fields);
  } else {
    setError(message);
  }
};

export default setErrorForm;
