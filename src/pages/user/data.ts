const fields = [
  'username',
  'firstName',
  'middleName',
  'lastName',
  'phone',
  'gender',
  'birthDay',
] as const;

const tabs = ['overview', 'editProfile', 'changePassword'] as const;

type TKeyField = typeof fields[number];

export { fields, tabs, TKeyField };
