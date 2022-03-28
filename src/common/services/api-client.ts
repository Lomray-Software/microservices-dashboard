import axios, { AxiosRequestConfig } from 'axios';
import { API_DOMAIN, DEFAULT_APP_LANGUAGE, IS_CLIENT } from '@constants/index';
import { IMicroserviceResponse } from '@interfaces/microservice';
import i18n from '@services/localization';

export const REFRESH_TOKEN_KEY = 'refresh-token';

export interface IApiClientReqOptions {
  isCached?: boolean;
  req?: AxiosRequestConfig;
}

interface IApiClientParams {
  headers?: Record<string, any>;
}

/**
 * API client service
 */

class ApiClient {
  /**
   * Client language
   * @private
   */
  private lang: string = DEFAULT_APP_LANGUAGE;

  /**
   * Request headers
   * @private
   */
  private readonly headers?: Record<string, any>;

  /**
   * @constructor
   */
  constructor({ headers }: IApiClientParams = {}) {
    this.headers = headers;

    i18n.on('languageChanged', (lng) => {
      this.lang = lng;
    });
  }

  /**
   * Set user refresh token
   */
  public setRefreshToken(token: string | null): void {
    if (token === null) {
      localStorage.removeItem(REFRESH_TOKEN_KEY);

      return;
    }

    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  /**
   * Send request to API
   */
  public async sendRequest<TResponse, TRequest>(
    method: string,
    params?: TRequest,
    { req }: IApiClientReqOptions = {},
  ): Promise<IMicroserviceResponse<TResponse>> {
    const { data } = await axios.request<IMicroserviceResponse<TResponse>>({
      baseURL: API_DOMAIN,
      method: 'POST',
      withCredentials: IS_CLIENT, // pass cookies
      headers: this.headers,
      ...(req || {}),
      data: {
        method,
        params,
      },
    });

    // Make error message beautiful (readable for user)
    if (data?.error) {
      const { message } = data.error;
      const parts = /Endpoint\sexception\s.+\):(.+)/.exec(message);

      data.error.message = parts?.[1] ?? parts?.[0] ?? message;
      data.error.rawMessage = message;
    }

    return data;
  }
}

export default ApiClient;
