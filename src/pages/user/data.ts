import i18n from '@common/services/localization';
import type { ISelectOptions } from '@components/forms/select-field';

const userFields = [
  { name: 'username', type: 'text' },
  { name: 'firstName', type: 'text' },
  { name: 'middleName', type: 'text' },
  { name: 'lastName', type: 'text' },
  { name: 'phone', type: 'phone' },
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

type TNameProfileFields = typeof profileFields[number]['name'];
type TTypeProfileFields = typeof profileFields[number]['type'];

interface IProfileFields {
  name: TNameProfileFields;
  type: TTypeProfileFields;
  options: ISelectOptions[];
}

export { userFields, tabs, profileFields, IProfileFields };
