import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AxiosRequestAdapter from '@services/axios-request-adapter';

interface IApiRequestOptions {
  lang: string;
}

/**
 * Api request helper for add common options to request. E.g. locale
 */
const ApiRequest = <TP>(
  config: AxiosRequestConfig,
  options: Partial<IApiRequestOptions> = {},
): Promise<AxiosResponse<TP>> => {
  // Add locale if exist
  if (options.lang) {
    config.params = {
      ...(config?.params ?? {}),
      _locale: options.lang,
    };
  }

  config.withCredentials = true; // pass cookies
  config.adapter = AxiosRequestAdapter.getAdapter();

  return axios.request(config);
};

export default ApiRequest;
