import { object, string } from 'yup';
import type { SchemaOf } from 'yup';
import i18n from '@common/services/localization';
import type { IEditProfileState } from '@pages/user/edit-profile/index';

const requiredError = i18n.t('forms:vRequired');
const tooShortError = i18n.t('forms:vTooShort');
const tooLongError = i18n.t('forms:vTooLong');

type SchemaType = SchemaOf<IEditProfileState>;

const validationSchema = (): SchemaType =>
  object({
    firstName: string().trim().required(requiredError).min(2, tooShortError).max(70, tooLongError),
    middleName: string().trim().required(requiredError).min(2, tooShortError),
    lastName: string().trim().required(requiredError).min(2, tooShortError),
    phone: string().trim().required(requiredError).min(2, tooShortError),
    profile: string().trim().required(requiredError).min(2, tooShortError),
    birthDay: string().trim().required(requiredError).min(2, tooShortError),
  });

export default validationSchema;
