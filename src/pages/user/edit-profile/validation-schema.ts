import type { SchemaOf } from 'yup';
import i18n from '@services/localization';
import { object, string } from '@services/yup';
import type { IEditProfile } from '@store/modules/pages/user/edit-profile';

type SchemaType = SchemaOf<Omit<Partial<IEditProfile>, 'gender'>>;

const validationSchema = (): SchemaType =>
  object({
    username: string()
      .trim()
      .required(i18n.t('forms:vRequired'))
      .min(2, i18n.t('forms:vTooShort'))
      // eslint-disable-next-line sonarjs/no-duplicate-string
      .max(70, i18n.t('forms:vTooLong')),
    firstName: string()
      .trim()
      .required(i18n.t('forms:vRequired'))
      .min(2, i18n.t('forms:vTooShort'))
      .max(70, i18n.t('forms:vTooLong')),
    middleName: string().trim().max(70, i18n.t('forms:vTooLong')),
    lastName: string().trim().max(70, i18n.t('forms:vTooLong')),
    phone: string().trim().max(70, i18n.t('forms:vTooLong')).nullable().stripEmptyString(),
    birthDay: string().trim().max(70, i18n.t('forms:vTooLong')).nullable().stripEmptyString(),
    role: string(),
  });

export default validationSchema;
