/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { IApiClientReqOptions } from '@services/api-client';
import type ApiClient from '@services/api-client';
import type ICookiesRemoveOutput from '@store/endpoints/interfaces/authentication/methods/cookies/remove';
import type {
  ITokenRenewInput,
  ITokenRenewOutput,
} from '@store/endpoints/interfaces/authentication/methods/token/renew';
import type IUserRoleMyOutput from '@store/endpoints/interfaces/authorization/methods/user-role/my';
import type IList from '@store/endpoints/interfaces/common/list';
import type { IQuery } from '@store/endpoints/interfaces/common/query';
import type IUpdate from '@store/endpoints/interfaces/common/update';
import type IView from '@store/endpoints/interfaces/common/view';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type {
  ISignInInput,
  ISignInOutput,
} from '@store/endpoints/interfaces/users/methods/user/sign-in';
import type {
  ISignOutInput,
  ISignOutOutput,
} from '@store/endpoints/interfaces/users/methods/user/sign-out';
import type { IChangePassword } from '@store/modules/pages/user/change-password';

interface IEndpointsCreateHandlerConfig
  extends Pick<IApiClientReqOptions, 'isCached' | 'isSkipRenew'> {}

interface IEndpointsCreateHandlerOptions
  extends Omit<IApiClientReqOptions, 'isCached' | 'isSkipRenew'> {}

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
    <TInput, TOutput>(
      method: string,
      { isCached, isSkipRenew }: IEndpointsCreateHandlerConfig = {},
    ) =>
    (params?: TInput, options?: IEndpointsCreateHandlerOptions) =>
      this.apiClient.sendRequest<TOutput, TInput>(method, params, {
        isCached,
        isSkipRenew,
        ...options,
      });

  /**
   * Authentication microservice
   */
  authentication = {
    token: {
      renew: this.createHandler<ITokenRenewInput, ITokenRenewOutput>('authentication.token.renew', {
        isSkipRenew: true,
      }),
    },
    cookies: {
      remove: this.createHandler<never, ICookiesRemoveOutput>('authentication.cookies.remove', {
        isSkipRenew: true,
      }),
    },
  };

  /**
   * Authorization microservice
   */
  authorization = {
    userRole: {
      my: this.createHandler<never, IUserRoleMyOutput>('authorization.user-role.my'),
    },
  };

  /**
   * Users microservice
   */
  users = {
    user: {
      list: this.createHandler<IQuery<IUser>, IList<IUser>>('users.user.list'),
      me: this.createHandler<IQuery<IUser>, IView<IUser>>('users.user.me'),
      view: this.createHandler<IQuery<IUser>, IView<IUser>>('users.user.view'),
      update: this.createHandler<IUpdate<IUser>, IView<IUser>>('users.user.update'),
      changePassword: this.createHandler<IChangePassword, IView<IUser>>(
        'users.user.change-password',
      ),
      signIn: this.createHandler<ISignInInput, ISignInOutput>('users.user.sign-in'),
      signOut: this.createHandler<ISignOutInput, ISignOutOutput>('users.user.sign-out', {
        isSkipRenew: true,
      }),
    },
    profile: {
      update: this.createHandler<IUpdate<IProfile>, IView<IProfile>>('users.profile.update'),
    },
  };
}

export default Endpoints;
