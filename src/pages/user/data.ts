import type { IField } from '@components/forms/fields';
import i18n from '@services/localization';
import { Role } from '@store/endpoints/interfaces/authorization/entities/role';

const genderOptions = [
  { value: 'male', label: i18n.t('users-page:male') },
  { value: 'female', label: i18n.t('users-page:female') },
  { value: 'notKnown', label: i18n.t('users-page:notKnown') },
  { value: 'notSpecified', label: i18n.t('users-page:notSpecified') },
];

const roleOptions = [
  { value: Role.admin, label: i18n.t('user-page:admin') },
  { value: Role.user, label: i18n.t('user-page:user') },
  { value: Role.guest, label: i18n.t('user-page:guest') },
];

const profileFields: IField[] = [
  { name: 'birthDay', type: 'date', title: 'users-page:birthDay' },
  {
    name: 'gender',
    options: genderOptions,
    type: 'select',
    title: 'users-page:gender',
  },
];

const userFields: IField[] = [
  { name: 'username', title: 'users-page:username' },
  { name: 'firstName', title: 'users-page:firstName' },
  { name: 'middleName', title: 'users-page:middleName' },
  { name: 'lastName', title: 'users-page:lastName' },
  { name: 'phone', type: 'phone', title: 'users-page:phone' },
];

const roleField: IField = {
  name: 'role',
  title: 'user-page:role',
  options: roleOptions,
  type: 'select',
};

export { userFields, profileFields, roleField };
