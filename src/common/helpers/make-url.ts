/**
 * combining url fom array of strings
 */
const makeUrl = (parts: string[]): string => normalizeUrl(parts.join('/'));

/**
 * removing doubling '/' and from the end of the url
 */
const normalizeUrl = (url: string): string => url.replace(/([^:]\/)\/+/g, '$1').replace(/\/+$/, '');

export { makeUrl, normalizeUrl };
