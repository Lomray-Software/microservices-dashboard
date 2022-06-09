import type { SchemaOf } from 'yup';
import i18n from '@common/services/localization';
import { object, string, ref } from '@services/yup';
import type { IChangePassword } from '@store/modules/pages/user/change-password';

type SchemaType = SchemaOf<Omit<IChangePassword, 'userId'>>;

const validationSchema = (): SchemaType =>
  object({
    newPassword: string().trim().required(i18n.t('forms:vRequired')),
    reEnterNewPassword: string().oneOf([ref('newPassword'), null], i18n.t('forms:vNotMatch')),
  });

export default validationSchema;
