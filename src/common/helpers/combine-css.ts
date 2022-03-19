/**
 * Combine css class names
 */
const combineCss = (...classNames: string[]): string =>
  classNames.filter((name: string) => name?.length > 0).join(' ');

export default combineCss;
