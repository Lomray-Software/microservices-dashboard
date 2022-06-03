import { object, string, ref } from 'yup';
import type { SchemaOf } from 'yup';
import i18n from '@common/services/localization';
import type { IChangePasswordState } from '@store/modules/pages/user/change-password';

const requiredError = i18n.t('forms:vRequired');
const notMatch = i18n.t('forms:vNotMatch');

type SchemaType = SchemaOf<Omit<IChangePasswordState, 'userId'>>;

const validationSchema = (): SchemaType =>
  object({
    oldPassword: string().trim().required(requiredError),
    newPassword: string().trim().required(requiredError),
    reEnterNewPassword: string().oneOf([ref('newPassword'), null], notMatch),
  });

export default validationSchema;
