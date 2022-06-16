import type { IField } from '@components/forms/fields';

const fields: IField[] = [
  { name: 'newPassword', type: 'password', title: 'user-page:newPassword' },
  {
    name: 'reEnterNewPassword',
    type: 'password',
    title: 'user-page:reEnterNewPassword',
  },
];

export default fields;
