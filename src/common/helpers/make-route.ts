import type ROUTES from '@constants/routes';
import { makeUrl } from '@helpers/make-url';

/**
 * Creating a route with a prefix
 *
 */
const makeRoute =
  (link: ROUTES) =>
  (id: string): string =>
    makeUrl([link, id]);

export default makeRoute;
