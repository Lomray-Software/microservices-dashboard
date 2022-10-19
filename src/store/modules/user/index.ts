import ApiClient from '@lomray/microservices-client-api/api-client';
import { Manager } from '@lomray/react-mobx-manager';
import type { IConstructorParams } from '@lomray/react-mobx-manager';
import { action, makeObservable, observable } from 'mobx';
import Cookies from 'universal-cookie';
import { IS_SERVER } from '@constants/index';
import type Endpoints from '@store/endpoints';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import User from '@store/entities/user';

/**
 * Current user store
 */
class UserStore {
  static isSingleton = true;

  /**
   * Is current user authenticated
   */
  public isAuth = false;

  /**
   * Current user
   */
  public user: IUser | null = null;

  /**
   * Only for client side
   * Check if user refreshed after reload page
   */
  public hasUserRefreshed = false;

  /**
   * @private
   */
  private readonly api: Endpoints;

  /**
   * @constructor
   */
  constructor({ endpoints }: IConstructorParams) {
    this.api = endpoints;

    makeObservable(this, {
      isAuth: observable,
      user: observable,
      setIsAuth: action,
      setUser: action,
    });
  }

  /**
   * Toggle user authenticated state
   */
  public setIsAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
  }

  /**
   * Toggle user refreshed flag
   */
  public setIsUserRefreshed = (value: boolean): void => {
    this.hasUserRefreshed = value;
  };

  /**
   * Set authenticated user
   */
  public setUser(user: IUser | null): void {
    this.user = user;
  }

  /**
   * Get current user (based on cookies)
   */
  public async refresh(): Promise<void> {
    let userId = this.user?.id;

    if (IS_SERVER && !userId) {
      const cookies: string | undefined = (await this.api.apiClient.getHeaders())?.cookie;
      const token = new Cookies(cookies).get(ApiClient.ACCESS_TOKEN_KEY);

      if (token) {
        userId = (await this.api.apiClient.getTokenPayload({ newToken: token }))?.userId;
      }
    }

    const user = await User.requestUser(this.api, {
      userId,
    });

    if (!user) {
      return;
    }

    this.setUser(user);
    this.setIsAuth(true);
  }

  /**
   * Check if client has refresh token
   */
  public async hasRefreshToken(): Promise<boolean> {
    return (await this.api.apiClient.getTokenPayload({ type: 'refresh' }))?.userId !== undefined;
  }
}

export default Manager.persistStore(UserStore, 'user');
