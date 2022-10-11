import Role from '@lomray/microservices-client-api/constants/role';
import type { IField } from '@components/forms/fields';
import type { ISelectOptions } from '@components/forms/select-field';

const genderOptions: ISelectOptions[] = [
  { value: 'male', label: 'users-page:male' },
  { value: 'female', label: 'users-page:female' },
  { value: 'notKnown', label: 'users-page:notKnown' },
  { value: 'notSpecified', label: 'users-page:notSpecified' },
];

const roleOptions = [
  { value: Role.admin, label: 'user-page:admin' },
  { value: Role.user, label: 'user-page:user' },
  { value: Role.guest, label: 'user-page:guest' },
];

const profileFields: IField[] = [
  { name: 'birthDay', type: 'date', title: 'users-page:birthDay' },
  {
    name: 'gender',
    options: genderOptions,
    type: 'select',
    title: 'users-page:gender',
  },
  { name: 'location', title: 'users-page:location' },
];

const userFields: IField[] = [
  { name: 'username', title: 'users-page:username' },
  { name: 'firstName', title: 'users-page:firstName' },
  { name: 'middleName', title: 'users-page:middleName' },
  { name: 'lastName', title: 'users-page:lastName' },
  { name: 'phone', type: 'phone', title: 'users-page:phone' },
  {
    name: 'role',
    title: 'user-page:role',
    options: roleOptions,
    type: 'select',
  },
];

export { userFields, profileFields };
