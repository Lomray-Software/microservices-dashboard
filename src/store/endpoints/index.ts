/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { IApiClientReqOptions } from '@services/api-client';
import type ApiClient from '@services/api-client';
import type ICookiesRemoveOutput from '@store/endpoints/interfaces/authentication/methods/cookies/remove';
import type {
  ITokenRenewInput,
  ITokenRenewOutput,
} from '@store/endpoints/interfaces/authentication/methods/token/renew';
import type IUserRole from '@store/endpoints/interfaces/authorization/entities/user-role';
import type IUserRoleMyOutput from '@store/endpoints/interfaces/authorization/methods/user-role/my';
import type {
  IUserRoleViewInput,
  IUserRoleViewOutput,
} from '@store/endpoints/interfaces/authorization/methods/user-role/view';
import type ICreate from '@store/endpoints/interfaces/common/create';
import type IList from '@store/endpoints/interfaces/common/list';
import type { IQuery } from '@store/endpoints/interfaces/common/query';
import type IRemove from '@store/endpoints/interfaces/common/remove';
import type IUpdate from '@store/endpoints/interfaces/common/update';
import type IView from '@store/endpoints/interfaces/common/view';
import type { IIdentityProvider } from '@store/endpoints/interfaces/users/entities/identity-provider';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type IChangePassword from '@store/endpoints/interfaces/users/methods/user/change-password';
import type {
  ISignInInput,
  ISignInOutput,
} from '@store/endpoints/interfaces/users/methods/user/sign-in';
import type {
  ISignOutInput,
  ISignOutOutput,
} from '@store/endpoints/interfaces/users/methods/user/sign-out';

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
      view: this.createHandler<IUserRoleViewInput, IUserRoleViewOutput>(
        'authorization.user-role.view',
      ),
      remove: this.createHandler<IQuery<IUserRole>, IRemove<IUserRole>>(
        'authorization.user-role.remove',
      ),
      create: this.createHandler<ICreate<IUserRole>, IView<IUserRole>>(
        'authorization.user-role.assign',
      ),
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
    identityProvider: {
      list: this.createHandler<IQuery<IIdentityProvider>, IList<IIdentityProvider>>(
        'users.identity-provider.list',
      ),
      remove: this.createHandler<IQuery<IIdentityProvider>, IRemove<IIdentityProvider>>(
        'users.identity-provider.remove',
      ),
    },
  };
}

export default Endpoints;
