import { action, makeObservable, observable } from 'mobx';
import type { ClassReturnType } from '@interfaces/helpers';
import type { IDomain } from '@interfaces/store-type';
import i18n from '@services/localization';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';
import UsersPageStore from '@store/modules/pages/users';

/**
 * User page store
 */
class UserPageStore implements IDomain {
  /**
   * API error
   */
  public error: string | null = null;

  /**
   * User
   */
  public user: IUser | null = null;

  /**
   * @private
   */
  private api: IConstructorParams['endpoints'];

  /**
   * @private
   */
  private usersStore: ClassReturnType<typeof UsersPageStore>;

  /**
   * @constructor
   */
  constructor({ storeManager, endpoints }: IConstructorParams) {
    this.api = endpoints;
    this.usersStore = storeManager.getStore(UsersPageStore);

    makeObservable(this, {
      user: observable,
      setUser: action.bound,
      getUser: action.bound,
    });
  }

  /**
   * Set users
   */
  public setUser(user: IUser): void {
    this.user = user;
  }

  /**
   * Set error message
   */
  public setError(message: string | null): void {
    this.error = message;
  }

  /**
   * Get users list
   */
  public async getUser(alias: string): Promise<void> {
    this.setError(null);
    const { result, error } = await this.api.users.user.view({ query: { where: { id: alias } } });

    if (error || !result) {
      this.setError(error?.message ?? i18n.t('unknownError'));

      return;
    }

    this.setUser(result.entity);
  }
}

export default UserPageStore;
