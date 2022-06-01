import { object, string } from 'yup';
import type { SchemaOf } from 'yup';
import i18n from '@common/services/localization';
import type { IEditProfileState } from '@store/modules/pages/user/efit-profile';

const requiredError = i18n.t('forms:vRequired');
const tooShortError = i18n.t('forms:vTooShort');
const tooLongError = i18n.t('forms:vTooLong');

type SchemaType = SchemaOf<Partial<IEditProfileState>>;

const validationSchema = (): SchemaType =>
  object({
    username: string().trim().min(2, tooShortError),
    firstName: string().trim().required(requiredError).min(2, tooShortError).max(70, tooLongError),
    middleName: string().trim().min(2, tooShortError),
    lastName: string().trim().min(2, tooShortError),
    phone: string().trim().min(2, tooShortError),
    birthDay: string().trim().min(2, tooShortError),
  });

export default validationSchema;
