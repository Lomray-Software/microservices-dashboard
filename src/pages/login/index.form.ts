import * as Yup from 'yup';
import ObjectSchema, { ObjectShape } from 'yup/lib/object';
import i18n from '@common/services/localization';

const validationSchema = (): ObjectSchema<ObjectShape> =>
  Yup.object().shape({
    login: Yup.string()
      .min(2, i18n.t('forms:vTooShort'))
      .max(70, i18n.t('forms:vTooLong'))
      .required(i18n.t('forms:vRequired')),
    password: Yup.string().min(2, i18n.t('forms:vTooShort')).required(i18n.t('forms:vRequired')),
  });

export default validationSchema;
