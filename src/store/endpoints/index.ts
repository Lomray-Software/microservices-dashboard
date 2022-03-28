/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ApiClient, { IApiClientReqOptions } from '@services/api-client';
import IQuery from '@store/endpoints/interfaces/common/query';
import IView from '@store/endpoints/interfaces/common/view';
import IUser from '@store/endpoints/interfaces/users/entities/user';
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
  }

  /**
   * Create endpoint handler
   */
  private createHandler =
    <TInput, TOutput>(method: string, { isCached }: IEndpointsCreateHandlerConfig = {}) =>
    (params?: TInput, config?: IApiClientReqOptions['req']) =>
      this.apiClient.sendRequest<TOutput, TInput>(method, params, { isCached, req: config });

  /**
   * Users microservice
   */
  users = {
    signIn: this.createHandler<ISignInInput, ISignInOutput>('users.user.sign-in'),
    signOut: this.createHandler<ISignOutInput, ISignOutOutput>('users.user.sign-out'),
    view: this.createHandler<IQuery, IView<IUser>>('users.user.view'),
  };
}

export default Endpoints;
