import { action, makeObservable, observable } from 'mobx';
import serializedStore from '@common/helpers/serialized-store';
import { IS_CLIENT } from '@constants/index';
import type { IDomain } from '@interfaces/store-type';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';

/**
 * Current user store
 */
class UserStore implements IDomain {
  /**
   * Is current user authenticated
   */
  public isAuth = false;

  /**
   * Current user
   */
  public user: IUser | null = null;

  /**
   * Only for SSR
   * Need update auth tokens and refresh user
   */
  public shouldRefresh = false;

  /**
   * @private
   */
  private api: IConstructorParams['endpoints'];

  /**
   * @constructor
   */
  constructor({ endpoints }: IConstructorParams) {
    this.api = endpoints;

    makeObservable(this, {
      isAuth: observable,
      user: observable,
      shouldRefresh: observable,
      setIsAuth: action,
      setUser: action,
      setShouldRefresh: action,
    });
  }

  /**
   * Call from store manager
   */
  public init(): void {
    // Need update auth tokens & refresh user. This is works only with SSR mode
    if (IS_CLIENT && this.shouldRefresh) {
      this.setShouldRefresh(false);
      void this.updateAuthToken();
    }
  }

  /**
   * Toggle user authenticated state
   */
  public setIsAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
  }

  /**
   * Set authenticated user
   */
  public setUser(user: IUser | null): void {
    this.user = user;
  }

  /**
   * Set should refresh
   */
  public setShouldRefresh(shouldRefresh: boolean): void {
    this.shouldRefresh = shouldRefresh;
  }

  /**
   * Get current user (based on cookies)
   */
  public async refresh(): Promise<void> {
    const { result } = await this.api.users.me();

    if (!result?.entity) {
      return;
    }

    this.setUser(result.entity);
    this.setIsAuth(true);
  }

  /**
   * Update auth tokens & refresh user
   */
  public async updateAuthToken(): Promise<void> {
    if (await this.api.apiClient.renewAuthTokens()) {
      await this.refresh();
    }
  }
}

export default serializedStore(UserStore, 'user');
