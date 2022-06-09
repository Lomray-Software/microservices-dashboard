import i18n from '@common/services/localization';
import type { ISelectOptions } from '@interfaces/select-options';

const userFields = [
  { name: 'username' },
  { name: 'firstName' },
  { name: 'middleName' },
  { name: 'lastName' },
  { name: 'phone' },
] as const;

const genderOptions = [
  { value: 'male', label: i18n.t('users-page:male') },
  { value: 'female', label: i18n.t('users-page:female') },
  { value: 'notKnown', label: i18n.t('users-page:notKnown') },
  { value: 'notSpecified', label: i18n.t('users-page:notSpecified') },
];

const profileFields = [
  { name: 'gender', options: genderOptions, type: 'select' },
  { name: 'birthDay', type: 'date' },
] as const;

const tabs = ['overview', 'editProfile', 'changePassword'] as const;

type TKeyUserFields = typeof userFields[number];
type TNameUserFields = typeof userFields[number]['name'];
type TNameProfileFields = typeof profileFields[number]['name'];
type TTypeProfileFields = typeof profileFields[number]['type'];

interface IProfileFields {
  name: TNameProfileFields;
  type: TTypeProfileFields;
  options: ISelectOptions[];
}

export { userFields, tabs, TKeyUserFields, profileFields, IProfileFields, TNameUserFields };
