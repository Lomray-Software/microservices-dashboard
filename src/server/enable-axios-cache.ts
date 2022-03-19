import { IAxiosCacheAdapterOptions, setupCache } from 'axios-cache-adapter';
import type { Express } from 'express';
import { IS_PROD, RESET_CACHE_TOKEN } from '@constants/index';
import AxiosRequestAdapter from '@services/axios-request-adapter';

const config: IAxiosCacheAdapterOptions = {
  maxAge: 60 * 60 * 1000, // 1 hour
  exclude: { query: false },
};

/**
 * Enable axios cache requests on server side
 * PS. cache only GET requests
 */
const enableAxiosCache = (express: Express): void => {
  if (!IS_PROD) {
    return;
  }

  const axiosCache = setupCache(config);

  AxiosRequestAdapter.init(axiosCache, { resetCacheEndpointToken: RESET_CACHE_TOKEN });

  express.get('/reset-cache', AxiosRequestAdapter.setResetCacheEndpoint.bind(AxiosRequestAdapter));
};

export default enableAxiosCache;
