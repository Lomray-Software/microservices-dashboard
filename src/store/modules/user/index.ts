import { Manager } from '@lomray/react-mobx-manager';
import type { IConstructorParams } from '@lomray/react-mobx-manager';
import { action, makeObservable, observable } from 'mobx';
import type Endpoints from '@store/endpoints';
import type IUser from '@store/endpoints/interfaces/users/entities/user';

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
   * @private
   */
  private api: Endpoints;

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
    const { result } = await this.api.users.user.me({
      query: {
        relations: ['profile'],
      },
    });

    if (!result?.entity) {
      return;
    }

    this.setUser(result.entity);
    this.setIsAuth(true);
  }
}

export default Manager.persistStore(UserStore, 'user');
