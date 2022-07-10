import type {
  IJsonQuery,
  IJsonQueryWhere,
  TEntityFields,
  TFieldCondition,
} from '@lomray/microservices-types';
import { JQJunction, JQOperator } from '@lomray/microservices-types';
import type { IReactionDisposer } from 'mobx';
import { action, makeObservable, observable, reaction } from 'mobx';
import type { HeaderGroup } from 'react-table';
import i18n from '@services/localization';

export type IRequestReturn<TEntity> =
  | { count?: number; list: TEntity[]; page: number }
  | string
  | undefined;

type TEntitiesFunc<TEntity> = (page?: number) => Promise<IRequestReturn<TEntity>>;

type TTableFilters<TEntity> = {
  name: TEntityFields<TEntity>;
  value: string | number | null;
  extraParams?: HeaderGroup['filterParams'];
};

interface ITableState<TEntity> {
  error: string | null;
  isFetching: boolean;
  isFirstRender: boolean;
  totalCount: number;
  page: number;
  pageSize: number;
  orderBy: IJsonQuery<TEntity>['orderBy'];
  where: IJsonQuery<TEntity>['where'];
}

/**
 * Table store
 */
class TableStore<TEntity> {
  /**
   * List of entities
   */
  public entities: TEntity[] = [];

  /**
   * Table state
   */
  public tableState: ITableState<TEntity> = {
    /**
     * API error
     */
    error: null,
    /**
     * Indicates than API request in process
     */
    isFetching: false,
    /**
     * Indicates than table renders first time
     */
    isFirstRender: true,
    /**
     * Total entities count
     */
    totalCount: 0,
    /**
     * Current page
     */
    page: 1,
    /**
     * Default page size
     */
    pageSize: 20,
    /**
     * Sorting conditions for entities
     */
    orderBy: {},
    /**
     * Filter for entities
     */
    where: {},
  };

  /**
   * State for table filters
   * @private
   */
  private tableFilters: { [name: string]: TTableFilters<TEntity> } = {};

  /**
   * Default error message
   */
  public defaultErrorMsg = i18n.t('unknownError');

  /**
   * Get table entities
   * @private
   */
  private getEntities: TEntitiesFunc<TEntity>;

  /**
   * @constructor
   */
  constructor() {
    makeObservable(this, {
      entities: observable,
      tableState: observable,
      setEntities: action.bound,
      getNextPage: action.bound,
      setFetching: action.bound,
      setOrderBy: action.bound,
      setPageSize: action.bound,
      setPage: action.bound,
      setFilter: action.bound,
      setError: action.bound,
      setTotalCount: action.bound,
      resetIsFirstRender: action.bound,
    });
  }

  /**
   * Add state subscribers
   * Get entities when state changed
   */
  public addSubscribe = (): IReactionDisposer =>
    reaction(
      () => ({
        orderBy: this.tableState.orderBy,
        where: this.tableState.where,
        page: this.tableState.page,
        pageSize: this.tableState.pageSize,
      }),
      () => void this.getEntities(),
    );

  /**
   * Reset state before retry requests
   */
  public resetIsFirstRender(): void {
    this.tableState.isFirstRender = true;
  }

  /**
   * Set error message
   */
  public setError(message: string | null): void {
    this.tableState.error = message;
  }

  /**
   * Set sort by for users
   */
  public setOrderBy(orderBy: IJsonQuery<TEntity>['orderBy']): void {
    this.tableState.orderBy = orderBy;
    this.setPage(1);
  }

  /**
   * Set page size
   */
  public setPageSize(count: number): void {
    this.tableState.pageSize = count;
  }

  /**
   * Set current page
   */
  public setPage(page: number): void {
    this.tableState.page = page;
  }

  /**
   * Set flat list entities
   */
  public setEntities(entities: TEntity[], shouldAdd = false): void {
    if (shouldAdd) {
      this.entities.push(...entities);
    } else {
      this.entities = entities;
    }
  }

  /**
   * Wrapper for get entities
   */
  public wrapRequest(callback: TEntitiesFunc<TEntity>): TEntitiesFunc<TEntity> {
    this.getEntities = async (pageVal) => {
      this.setError(null);
      this.setFetching(true);

      const result = await callback(pageVal);

      this.setFetching(false);

      if (result === undefined) {
        return;
      }

      if (typeof result === 'string') {
        this.setError(result ?? this.defaultErrorMsg);

        return;
      }

      const { list, count, page } = result;

      this.setPage(page);
      this.setTotalCount(count ?? list.length);
      this.setEntities(list, page > 1);

      return result;
    };

    return this.getEntities;
  }

  /**
   * Toggle fetching
   */
  public setFetching(isFetching: boolean): void {
    this.tableState.isFetching = isFetching;

    if (!this.tableState.isFetching) {
      this.tableState.isFirstRender = false;
    }
  }

  /**
   * Lazy load pagination
   */
  public getNextPage(): Promise<IRequestReturn<TEntity>> | undefined {
    const { page, pageSize, totalCount } = this.tableState;

    if (page * pageSize >= totalCount) {
      return;
    }

    if (this.entities.length >= totalCount) {
      return;
    }

    if (page === 1 && totalCount < pageSize) {
      return;
    }

    return this.getEntities(page + 1);
  }

  /**
   * Set count entities
   */
  public setTotalCount(count: number): void {
    this.tableState.totalCount = count;
  }

  /**
   * Get field filter
   * @protected
   */
  protected getFieldFilter(
    name: TTableFilters<TEntity>['name'],
    value: TTableFilters<TEntity>['value'],
    extraParams: TTableFilters<TEntity>['extraParams'] = {},
  ): TFieldCondition {
    if (value === null || typeof value === 'number') {
      return value;
    }

    const { castType } = extraParams;

    return {
      [JQOperator.like]: `%${value}%`,
      insensitive: true,
      ...(castType ? { type: castType } : {}),
    };
  }

  /**
   * Update table filters state
   */
  public setFilter(name: string, value: string, extraParams?: HeaderGroup['filterParams']): void {
    if (!value && this.tableFilters[name]) {
      delete this.tableFilters[name];
    } else {
      this.tableFilters[name] = { name: name as TEntityFields<TEntity>, value, extraParams };
    }

    // build conditions
    const conditions = Object.values(this.tableFilters).map(
      ({ name: cName, value: cValue, extraParams: cExtraParams }) => ({
        [cName]: this.getFieldFilter(cName, cValue, cExtraParams),
      }),
    );

    this.setPage(1);
    this.tableState.where = { [JQJunction.and]: conditions } as IJsonQueryWhere<TEntity>;
  }
}

export default TableStore;
