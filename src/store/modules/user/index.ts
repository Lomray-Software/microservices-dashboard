import { action, makeObservable, observable } from 'mobx';
import serializedStore from '@common/helpers/serialized-store';
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
   * Set authenticated user
   */
  public setUser(user: IUser | null): void {
    this.user = user;
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
}

export default serializedStore(UserStore, 'user');
