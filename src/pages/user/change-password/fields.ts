import i18n from '@services/localization';

const fields = [
  { name: 'newPassword', type: 'password', title: i18n.t('user-page:newPassword') },
  {
    name: 'reEnterNewPassword',
    type: 'password',
    title: i18n.t('user-page:reEnterNewPassword'),
  },
];

export default fields;
