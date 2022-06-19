import type { IReactionDisposer } from 'mobx';
import { action, makeObservable, observable, reaction } from 'mobx';
import type { IDomain } from '@interfaces/store-type';
import type { IJsonQuery } from '@store/endpoints/interfaces/common/query';
import { IJsonQueryOperator } from '@store/endpoints/interfaces/common/query';
import type { IIdentityProvider } from '@store/endpoints/interfaces/users/entities/identity-provider';
import type { IConstructorParams } from '@store/manager';

type TSortBy = IJsonQuery<IIdentityProvider>['orderBy'];
type TWhere = IJsonQuery<IIdentityProvider>['where'];

/**
 * Identity provider store
 */
class IdentityProviderStore implements IDomain {
  /**
   * API error
   */
  public error: string | null = null;

  /**
   * IdentityProvides
   */
  public identityProvides: IIdentityProvider[] = [];

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
   * Sorting conditions for identityProvides
   */
  public sortBy: TSortBy = {};

  /**
   * Filter for identityProvides
   */
  public where: TWhere = {};

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
      identityProvides: observable,
      where: observable,
      sortBy: observable,
      error: observable,
      count: observable,
      page: observable,
      setIdentities: action.bound,
      getIdentities: action.bound,
      pageSize: observable,
      setError: action.bound,
      setCount: action.bound,
      setPageSize: action.bound,
      setPage: action.bound,
      setWhere: action.bound,
      setSortBy: action.bound,
    });
  }

  /**
   * Add state subscribers
   * Get identities when state changed
   */
  public addSubscribe = (): IReactionDisposer =>
    reaction(
      () => ({ sortBy: this.sortBy, where: this.where, pageSize: this.pageSize, page: this.page }),
      () => {
        void this.getIdentities();
      },
    );

  /**
   * Set error message
   */
  public setError(message: string | null): void {
    this.error = message;
  }

  /**
   * Set sort by for users
   */
  public setSortBy(sortBy: TSortBy): void {
    this.sortBy = sortBy;
    this.setPage(1);
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
  public setPageSize(size: number): void {
    this.pageSize = size;
  }

  /**
   * Set current page
   */
  public setPage(page: number): void {
    this.page = page;
  }

  /**
   * Set identities
   */
  public setIdentities(identities: IIdentityProvider[]): void {
    this.identityProvides = identities;
  }

  /**
   * Get identities list
   */
  public async getIdentities(userId?: string): Promise<void> {
    const { result, error } = await this.api.users.identityProvider.list({
      query: {
        pageSize: this.pageSize,
        page: this.page,
        where: {
          ...this.where,
          userId,
        },
        orderBy: this.sortBy,
      },
    });

    if (error || !result?.list) {
      return;
    }

    const { list, count } = result;

    this.setIdentities(list);
    this.setCount(count || 0);
  }

  /**
   * Set where filtering identities list
   */
  public setWhere(name: string, value: string): void {
    this.setPage(1);
    this.where = { [name]: { [IJsonQueryOperator.like]: `%${value}%` } };
  }
}

export default IdentityProviderStore;
