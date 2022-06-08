import { object, string } from 'yup';
import type { SchemaOf } from 'yup';
import i18n from '@common/services/localization';
import ExtendYupValidation from '@helpers/extend-yup-validation';
import type { IEditProfile } from '@store/modules/pages/user/edit-profile';

type SchemaType = SchemaOf<Partial<IEditProfile>>;

ExtendYupValidation();

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
  });

export default validationSchema;
