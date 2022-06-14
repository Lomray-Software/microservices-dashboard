import { addMethod, string } from 'yup';

/**
 * Convert empty string to null
 * @constructor
 */
addMethod(string, 'stripEmptyString', function () {
  return this.transform((value: string) => (value === '' ? null : value));
});

export * from 'yup';
