import { action, makeObservable, observable } from 'mobx';
import type { IDomain } from '@interfaces/store-type';
import i18n from '@services/localization';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';

/**
 * Users page store
 */
class UsersPageStore implements IDomain {
  /**
   * API error
   */
  public error: string | null = null;

  /**
   * Users list
   */
  public users: IUser[] = [];

  /**
   * Users count
   */
  public count = 0;

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
      error: observable,
      users: observable,
      count: observable,
      setError: action.bound,
      setUsers: action.bound,
      setCount: action.bound,
      getUsers: action.bound,
    });
  }

  /**
   * Set users
   */
  public setUsers(users: IUser[]): void {
    this.users = users;
  }

  /**
   * Set error message
   */
  public setError(message: string | null): void {
    this.error = message;
  }

  /**
   * Set users count
   */
  public setCount(count: number): void {
    this.count = count;
  }

  /**
   * Get users list
   */
  public async getUsers(): Promise<void> {
    this.setError(null);
    const { result, error } = await this.api.users.user.list({ query: { pageSize: 10 } });

    if (error || !result) {
      this.setError(error?.message ?? i18n.t('unknownError'));

      return;
    }

    const { list, count } = result;

    this.setUsers(list);
    this.setCount(count || 0);
  }
}

export default UsersPageStore;
