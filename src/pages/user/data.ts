import type { IField } from '@components/forms/fields';
import i18n from '@services/localization';

const genderOptions = [
  { value: 'male', label: i18n.t('users-page:male') },
  { value: 'female', label: i18n.t('users-page:female') },
  { value: 'notKnown', label: i18n.t('users-page:notKnown') },
  { value: 'notSpecified', label: i18n.t('users-page:notSpecified') },
];

const profileFields: IField[] = [
  { name: 'birthDay', type: 'date', title: i18n.t('users-page:birthDay') },
  {
    name: 'gender',
    options: genderOptions,
    type: 'select',
    title: i18n.t('users-page:gender'),
  },
];

const userFields: IField[] = [
  { name: 'username', title: i18n.t('users-page:username') },
  { name: 'firstName', title: i18n.t('users-page:firstName') },
  { name: 'middleName', title: i18n.t('users-page:middleName') },
  { name: 'lastName', title: i18n.t('users-page:lastName') },
  { name: 'phone', type: 'phone', title: i18n.t('users-page:phone') },
];

const tabs = ['overview', 'editProfile', 'changePassword'] as const;

export { userFields, tabs, profileFields };
