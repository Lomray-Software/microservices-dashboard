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
   * Is open popup
   */
  public isOpenPopup = false;

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
      isOpenPopup: observable,
      user: observable,
      setIsAuth: action,
      setUser: action,
      togglePopup: action.bound,
    });
  }

  /**
   * Toggle user authenticated state
   */
  public setIsAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
  }

  /**
   * Toggle popup
   */
  public togglePopup(): void {
    this.isOpenPopup = !this.isOpenPopup;
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
    const { result } = await this.api.users.user.me();

    if (!result?.entity) {
      return;
    }

    this.setUser(result.entity);
    this.setIsAuth(true);
  }
}

export default serializedStore(UserStore, 'user');
