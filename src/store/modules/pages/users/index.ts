import debounce from 'lodash.debounce';
import { action, makeObservable, observable } from 'mobx';
import type { IDomain } from '@interfaces/store-type';
import i18n from '@services/localization';
import type { IJsonQuery } from '@store/endpoints/interfaces/common/query';
import { IJsonQueryOperator } from '@store/endpoints/interfaces/common/query';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';

type TSortBy = IJsonQuery<IUser>['orderBy'];

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
   * Page size
   */
  public pageSize = 10;

  /**
   * Current page
   */
  public page = 1;

  /**
   * Sorting conditions for reviews
   */
  public sortBy: TSortBy = {};

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
      sortBy: observable,
      error: observable,
      users: observable,
      count: observable,
      page: observable,
      pageSize: observable,
      setError: action.bound,
      setUsers: action.bound,
      setCount: action.bound,
      setPageSize: action.bound,
      setPage: action.bound,
      getUsers: action.bound,
      onFilterUser: action.bound,
      setSortBy: action.bound,
      onChangeOrderBy: action.bound,
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
   * Set sort by for review
   */
  public setSortBy(sortBy: TSortBy): Promise<void> {
    this.sortBy = sortBy;
    this.page = 1;

    return this.getUsers();
  }

  /**
   * Change order by for sort
   */
  public onChangeOrderBy(name: string, value: string): Promise<void> {
    const orderBy = { ...this.sortBy };

    if (value) {
      orderBy[name] = value;
    } else if (orderBy[name] && !value) {
      delete orderBy[name];
    }

    return this.setSortBy(orderBy);
  }

  /**
   * Set users count
   */
  public setCount(count: number): void {
    this.count = count;
  }

  /**
   * Set page size
   */
  public setPageSize(count: number): Promise<void> {
    this.pageSize = count;

    return this.getUsers();
  }

  /**
   * Set current page
   */
  public setPage(page: number): Promise<void> {
    this.page = page;

    return this.getUsers();
  }

  /**
   * Get users list
   */
  public async getUsers(filter: Record<string, any> = {}): Promise<void> {
    this.setError(null);
    const { result, error } = await this.api.users.user.list({
      query: {
        pageSize: this.pageSize,
        page: this.page,
        where: filter,
        orderBy: this.sortBy,
      },
    });

    if (error || !result) {
      this.setError(error?.message ?? i18n.t('unknownError'));

      return;
    }

    const { list, count } = result;

    this.setUsers(list);
    this.setCount(count || 0);
  }

  /**
   * Filter users list
   */
  public onFilterUser = debounce((where: string, substring: string) => {
    this.page = 1;

    return this.getUsers({ [where]: { [IJsonQueryOperator.like]: `%${substring}%` } });
  }, 500);
}

export default UsersPageStore;
