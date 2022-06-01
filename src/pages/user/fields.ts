const fields = [
  'username',
  'firstName',
  'middleName',
  'lastName',
  'phone',
  'gender',
  'birthDay',
] as const;

type TKeyField = typeof fields[number];

export { fields, TKeyField };
