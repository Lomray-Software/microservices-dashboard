import { object, string } from 'yup';
import type { SchemaOf } from 'yup';
import i18n from '@common/services/localization';
import type { ILoginForm } from './index';

type SchemaType = SchemaOf<ILoginForm>;

const validationSchema = (): SchemaType =>
  object({
    login: string()
      .trim()
      .required(i18n.t('forms:vRequired'))
      .min(2, i18n.t('forms:vTooShort'))
      .max(70, i18n.t('forms:vTooLong')),
    password: string()
      .trim()
      .required(i18n.t('forms:vRequired'))
      .min(2, i18n.t('forms:vTooShort'))
      .max(70, i18n.t('forms:vTooLong')),
  });

export default validationSchema;
