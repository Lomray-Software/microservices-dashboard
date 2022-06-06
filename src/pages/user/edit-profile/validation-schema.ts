import { object, string } from 'yup';
import type { SchemaOf } from 'yup';
import i18n from '@common/services/localization';
import type { IEditProfile } from '@store/modules/pages/user/edit-profile';

type SchemaType = SchemaOf<Partial<IEditProfile>>;

const validationSchema = (): SchemaType =>
  object({
    username: string()
      .required(i18n.t('forms:vRequired'))
      .trim()
      .min(2, i18n.t('forms:vTooShort'))
      // eslint-disable-next-line sonarjs/no-duplicate-string
      .max(70, i18n.t('forms:vTooLong')),
    firstName: string()
      .required(i18n.t('forms:vRequired'))
      .trim()
      .min(2, i18n.t('forms:vTooShort'))
      .max(70, i18n.t('forms:vTooLong')),
    middleName: string().trim().max(70, i18n.t('forms:vTooLong')),
    lastName: string().trim().max(70, i18n.t('forms:vTooLong')),
    phone: string().trim().max(70, i18n.t('forms:vTooLong')),
    birthDay: string().trim().max(70, i18n.t('forms:vTooLong')),
  });

export default validationSchema;
