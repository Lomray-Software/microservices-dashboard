import type { IField } from '@components/forms/fields';

const fieldsIdentity: IField[] = [
  { name: 'createdAt', title: 'user-page:createdAt' },
  { name: 'updatedAt', title: 'user-page:updatedAt' },
];

const fieldsIdentityParams: IField[] = [{ name: 'uid', title: 'user-page:uid' }];

export { fieldsIdentity, fieldsIdentityParams };
