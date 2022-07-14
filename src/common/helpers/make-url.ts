import { generatePath } from 'react-router';
import ROUTE from '@constants/routes';
import type { IParams, RouteKeys } from '@interfaces/i-route';

/**
 * Build full url with params
 *
 * E.g.: makeURL('EVENTS_POST', { postId: '123' });
 */
const makeURL = <TKey extends RouteKeys>(routeKey: TKey, params?: IParams<TKey>): string => {
  const path = ROUTE[routeKey].URL;

  return generatePath(path, params);
};

export default makeURL;
