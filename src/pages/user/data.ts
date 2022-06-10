import i18n from '@common/services/localization';

const genderOptions = [
  { value: 'male', title: i18n.t('users-page:male') },
  { value: 'female', title: i18n.t('users-page:female') },
  { value: 'notKnown', title: i18n.t('users-page:notKnown') },
  { value: 'notSpecified', title: i18n.t('users-page:notSpecified') },
];

const profileFields = [
  { name: 'birthDay', type: 'date', title: i18n.t('users-page:birthDay') },
  {
    name: 'gender',
    options: genderOptions,
    type: 'select',
    title: i18n.t('users-page:gender'),
  },
];

const userFields = [
  { name: 'username', type: 'text', title: i18n.t('users-page:username') },
  { name: 'firstName', type: 'text', title: i18n.t('users-page:firstName') },
  { name: 'middleName', type: 'text', title: i18n.t('users-page:middleName') },
  { name: 'lastName', type: 'text', title: i18n.t('users-page:lastName') },
  { name: 'phone', type: 'phone', title: i18n.t('users-page:phone') },
];

const tabs = ['overview', 'editProfile', 'changePassword'] as const;

export { userFields, tabs, profileFields };
