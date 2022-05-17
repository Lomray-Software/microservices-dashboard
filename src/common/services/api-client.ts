import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { API_DOMAIN, DEFAULT_APP_LANGUAGE, IS_CLIENT, IS_SERVER } from '@constants/index';
import waitFor from '@helpers/wait-for';
import type { IBaseException, IMicroserviceResponse } from '@interfaces/microservice';
import i18n from '@services/localization';
import type Endpoints from '@store/endpoints';
import { TokenCreateReturnType } from '@store/endpoints/interfaces/authentication/methods/token/renew';
import type Manager from '@store/manager';
import AuthStore from '@store/modules/user/auth';

export const REFRESH_TOKEN_KEY = 'refresh-token';

export interface IApiClientReqOptions {
  isCached?: boolean;
  isSkipRenew?: boolean;
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
   * API Endpoints
   * @private
   */
  private endpoints: Endpoints;

  /**
   * Mobx store manager
   * @private
   */
  private storeManager: Manager;

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
   * Currently going request for refresh auth tokens
   * @private
   */
  private hasAuthRefresh = false;

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
   * Set API endpoints
   */
  public setEndpoints(endpoints: Endpoints): void {
    this.endpoints = endpoints;
  }

  /**
   * Set store manager
   */
  public setStoreManager(manager: Manager): void {
    this.storeManager = manager;
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
   * Make beautiful error message
   * @private
   */
  private static makeBeautifulError(error: IBaseException): void {
    const { message } = error;
    const parts = /Endpoint\sexception\s.+\):(.+)/.exec(message);

    error.message = parts?.[1] ?? parts?.[0] ?? message;
    error.rawMessage = message;
  }

  /**
   * Run request with blocking refresh auth tokens
   * @private
   */
  private async disableRenewAuthTokens<TCallback>(
    callback: () => Promise<TCallback> | TCallback,
  ): Promise<TCallback> {
    this.hasAuthRefresh = true;
    const result = await callback();

    this.hasAuthRefresh = false;

    return result;
  }

  /**
   * Renew auth tokens
   */
  public renewAuthTokens(): Promise<boolean> {
    return this.disableRenewAuthTokens(async () => {
      const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (refresh) {
        const { result } = await this.endpoints.authentication.token.renew({
          refresh,
          returnType: TokenCreateReturnType.cookies,
        });

        if (result?.refresh) {
          this.setRefreshToken(result.refresh);

          return true;
        }
      }

      return false;
    });
  }

  /**
   * Detect auth token expiration and try to renew
   * @private
   */
  private async updateAuthTokens(error: IBaseException): Promise<boolean> {
    if (error.status !== 401) {
      return false;
    }

    if (IS_SERVER) {
      const authStore = this.storeManager.getStore(AuthStore);

      // Pass flag to client side for update auth tokens & user
      authStore.setShouldRefresh(true);
      authStore.setFetching(true);

      return false;
    }

    // hold this request (this is parallel request) and wait until previous request refresh auth tokens
    if (this.hasAuthRefresh) {
      return waitFor(
        () => !this.hasAuthRefresh,
        () => true,
      );
    }

    // Access token expired and we need renew it
    if (await this.renewAuthTokens()) {
      return true;
    }

    // Failed to renew tokens - clear user store
    await this.disableRenewAuthTokens(() => this.storeManager.getStore(AuthStore).signOut());

    return false;
  }

  /**
   * Handle network and other internal errors
   * @private
   */
  private static handleInternalError(e: AxiosError): IBaseException {
    const { message, response, code } = e || {};
    let errMessage = message;

    // api timeout
    if (code === 'ECONNABORTED' && message.includes('timeout')) {
      errMessage = i18n.t('translation:timeoutError');
    } else if (!response && message === 'Network Error') {
      errMessage = i18n.t('translation:noInternetError');
    }

    return {
      status: response?.status ?? 0,
      code: 0,
      service: 'unknown',
      message: errMessage,
    };
  }

  /**
   * Send request to API
   */
  public async sendRequest<TResponse, TRequest>(
    method: string,
    params?: TRequest,
    options: IApiClientReqOptions = {},
  ): Promise<IMicroserviceResponse<TResponse>> {
    const { req = {}, isSkipRenew = false } = options;

    try {
      const { data } = await axios.request<IMicroserviceResponse<TResponse>>({
        baseURL: API_DOMAIN,
        method: 'POST',
        withCredentials: IS_CLIENT, // pass cookies
        headers: this.headers,
        ...req,
        data: {
          method,
          params,
        },
      });

      // Common error handlers
      if (data?.error) {
        ApiClient.makeBeautifulError(data.error);

        if (!isSkipRenew && (await this.updateAuthTokens(data.error))) {
          // repeat previous request
          return this.sendRequest(method, params, options);
        }
      }

      return data;
    } catch (e) {
      return {
        error: ApiClient.handleInternalError(e),
      };
    }
  }
}

export default ApiClient;
