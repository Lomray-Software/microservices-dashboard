import type { IField } from '@components/forms/fields';
import type { ISelectOptions } from '@components/forms/select-field';

const genderOptions: ISelectOptions[] = [
  { value: 'male', label: 'users-page:male' },
  { value: 'female', label: 'users-page:female' },
  { value: 'notKnown', label: 'users-page:notKnown' },
  { value: 'notSpecified', label: 'users-page:notSpecified' },
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

export { userFields, profileFields };
