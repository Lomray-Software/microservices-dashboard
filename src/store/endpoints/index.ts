/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ApiClient, { IApiClientReqOptions } from '@services/api-client';
import type ICookiesRemoveOutput from '@store/endpoints/interfaces/authentication/methods/cookies/remove';
import type {
  ITokenRenewInput,
  ITokenRenewOutput,
} from '@store/endpoints/interfaces/authentication/methods/token/renew';
import type IList from '@store/endpoints/interfaces/common/list';
import type { IQuery } from '@store/endpoints/interfaces/common/query';
import type IView from '@store/endpoints/interfaces/common/view';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type {
  ISignInInput,
  ISignInOutput,
} from '@store/endpoints/interfaces/users/methods/user/sign-in';
import type {
  ISignOutInput,
  ISignOutOutput,
} from '@store/endpoints/interfaces/users/methods/user/sign-out';

interface IEndpointsCreateHandlerConfig extends Pick<IApiClientReqOptions, 'isCached'> {}

/**
 * Backend API endpoints
 */
class Endpoints {
  /**
   * API client
   */
  public readonly apiClient: ApiClient;

  /**
   * @constructor
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;

    apiClient.setEndpoints(this);
  }

  /**
   * Create endpoint handler
   */
  private createHandler =
    <TInput, TOutput>(method: string, { isCached }: IEndpointsCreateHandlerConfig = {}) =>
    (params?: TInput, config?: IApiClientReqOptions['req']) =>
      this.apiClient.sendRequest<TOutput, TInput>(method, params, { isCached, req: config });

  /**
   * Authentication microservice
   */
  authentication = {
    token: {
      renew: this.createHandler<ITokenRenewInput, ITokenRenewOutput>('authentication.token.renew'),
    },
    cookies: {
      remove: this.createHandler<never, ICookiesRemoveOutput>('authentication.cookies.remove'),
    },
  };

  /**
   * Users microservice
   */
  users = {
    user: {
      list: this.createHandler<IQuery<IUser>, IList<IUser>>('users.user.list'),
      me: this.createHandler<never, IView<IUser>>('users.user.me'),
      view: this.createHandler<IQuery<IUser>, IView<IUser>>('users.user.view'),
      signIn: this.createHandler<ISignInInput, ISignInOutput>('users.user.sign-in'),
      signOut: this.createHandler<ISignOutInput, ISignOutOutput>('users.user.sign-out'),
    },
  };
}

export default Endpoints;
