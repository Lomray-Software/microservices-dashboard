import type { SchemaOf } from 'yup';
import i18n from '@services/localization';
import { object, string, ref } from '@services/yup';
import type { IChangePassword } from '@store/modules/pages/user/change-password';

const validationSchema = (): SchemaOf<IChangePassword> =>
  object({
    newPassword: string().trim().required(i18n.t('forms:vRequired')),
    reEnterNewPassword: string().oneOf([ref('newPassword'), null], i18n.t('forms:vNotMatch')),
  });

export default validationSchema;
