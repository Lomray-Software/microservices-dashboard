/**
 * Capitalize first letter in string
 */
const ucfirst = (str: string, locale: string): string => {
  const [first, ...rest] = str;

  return first.toLocaleUpperCase(locale) + rest.join('');
};

export default ucfirst;
