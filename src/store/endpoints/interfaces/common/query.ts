/* eslint-disable @typescript-eslint/no-unused-vars */
type ObjectLiteral = Record<string | symbol | number, any>;

export enum IJsonQueryJunction {
  and = 'and',
  or = 'or',
}

export enum IJsonQueryOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum IJsonQueryOrderNulls {
  first = 'first',
  last = 'last',
}

export enum IJsonQueryOperator {
  between = 'between',
  like = 'like',
  in = 'in',
  notIn = '!in',
  notEqual = '!=',
  greater = '>',
  greaterOrEqual = '>=',
  less = '<',
  lessOrEqual = '<=',
}

export enum IJsonQueryFieldType {
  text = 'text',
}

type ToObject<T> = T extends readonly any[] ? T[0] : T;
type FilterValue = string | number | null;
type NonEmptyArray<T> = [T, ...T[]];
type Without<T, TU> = {
  [P in Exclude<keyof T, keyof TU>]?: never;
};
type XOR<T, TU> = T | TU extends Record<string, any>
  ? (Without<T, TU> & TU) | (Without<TU, T> & T)
  : T | TU;
type CurryXOR<T, TR extends unknown[]> = {
  0: [T];
  1: TR extends readonly [infer U, ...infer V] ? [...CurryXOR<XOR<T, U>, V>] : never;
}[TR extends readonly [infer _, ...infer __] ? 1 : 0];
type XOR_MULTIPLE<TR extends unknown[]> = {
  0: TR extends readonly [infer U] ? U : never;
  1: TR extends readonly [infer U, ...infer V] ? CurryXOR<U, V>[0] : never;
}[TR extends readonly [infer _, ...infer __] ? 1 : 0];

type IJsonQueryOrderField = {
  order: keyof typeof IJsonQueryOrder;
  nulls?: keyof typeof IJsonQueryOrderNulls;
};

type FilterOptions = { type?: IJsonQueryFieldType };

type FilterLess = { [IJsonQueryOperator.less]: FilterValue } & FilterOptions;
type FilterLessOrEqual = { [IJsonQueryOperator.lessOrEqual]: FilterValue } & FilterOptions;
type FilterGreater = { [IJsonQueryOperator.greater]: FilterValue } & FilterOptions;
type FilterGreaterOrEqual = { [IJsonQueryOperator.greaterOrEqual]: FilterValue } & FilterOptions;

export type FilterCondition = XOR_MULTIPLE<
  [
    {
      [IJsonQueryOperator.notEqual]: FilterValue;
    } & FilterOptions,
    {
      [IJsonQueryOperator.between]: [FilterValue, FilterValue];
      isIncludes?: boolean;
    } & FilterOptions,
    {
      [IJsonQueryOperator.like]: string;
      insensitive?: boolean;
    } & FilterOptions,
    {
      [IJsonQueryOperator.in]: NonEmptyArray<FilterValue>;
    } & FilterOptions,
    {
      [IJsonQueryOperator.notIn]: NonEmptyArray<FilterValue>;
    } & FilterOptions,
    XOR_MULTIPLE<
      [
        FilterLess,
        FilterLessOrEqual,
        FilterGreater,
        FilterGreaterOrEqual,
        XOR<FilterLess, FilterLessOrEqual> & XOR<FilterGreater, FilterGreaterOrEqual>,
      ]
    >,
  ]
>;

/**
 * Extends relations from this interface
 */
export interface IRelation {
  isRelation?: boolean;
}

export type WithRelationFields<
  TE extends ObjectLiteral,
  TP extends string | number | symbol,
> = ToObject<TE[TP]> extends IRelation
  ? // @ts-ignore
    keyof { [PF in keyof ToObject<TE[TP]> as `${TP}.${PF}`]: string }
  : never;

// Get entity keys and keys with relations
export type TEntityFields<TEntity> = keyof {
  [P in keyof TEntity as WithRelationFields<TEntity, P> | P]: any;
};

export type TFieldCondition = string | number | null | FilterCondition;

export type FilterFields<TEntity = ObjectLiteral> = {
  [field in TEntityFields<TEntity>]: TFieldCondition;
};

export type IJsonQueryWhere<TEntity = ObjectLiteral> =
  | {
      [IJsonQueryJunction.and]?: IJsonQueryWhere<TEntity>[];
      [IJsonQueryJunction.or]?: IJsonQueryWhere<TEntity>[];
    }
  | FilterFields<Partial<TEntity>>;

interface IJsonQueryRelation {
  name: string;
  where?: IJsonQueryWhere;
}

export interface IJsonQuery<TEntity = ObjectLiteral> {
  attributes?: (keyof TEntity)[];
  orderBy?: {
    [field in keyof TEntity]?: keyof typeof IJsonQueryOrder | IJsonQueryOrderField;
  };
  page?: number;
  pageSize?: number;
  relations?: (string | IJsonQueryRelation)[];
  where?: IJsonQueryWhere<TEntity>;
}

export interface IQuery<TEntity = ObjectLiteral> {
  query?: IJsonQuery<TEntity>;
}
