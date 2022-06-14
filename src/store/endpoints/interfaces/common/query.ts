/* eslint-disable @typescript-eslint/no-unused-vars */
type ObjectLiteral = Record<string | symbol, any>;

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

type FilterLess = { [IJsonQueryOperator.less]: FilterValue };
type FilterLessOrEqual = { [IJsonQueryOperator.lessOrEqual]: FilterValue };
type FilterGreater = { [IJsonQueryOperator.greater]: FilterValue };
type FilterGreaterOrEqual = { [IJsonQueryOperator.greaterOrEqual]: FilterValue };

export type FilterCondition = XOR_MULTIPLE<
  [
    {
      [IJsonQueryOperator.notEqual]: FilterValue;
    },
    {
      [IJsonQueryOperator.between]: [FilterValue, FilterValue];
      isIncludes?: boolean;
    },
    {
      [IJsonQueryOperator.like]: string;
    },
    {
      [IJsonQueryOperator.in]: NonEmptyArray<FilterValue>;
    },
    {
      [IJsonQueryOperator.notIn]: NonEmptyArray<FilterValue>;
    },
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

export type FilterFields<TEntity = ObjectLiteral> = {
  [field in keyof TEntity]: string | number | null | FilterCondition;
};

export type IJsonQueryWhere<TEntity = ObjectLiteral> =
  | {
      [IJsonQueryJunction.and]?: NonEmptyArray<IJsonQueryWhere<TEntity>>;
      [IJsonQueryJunction.or]?: NonEmptyArray<IJsonQueryWhere<TEntity>>;
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
  relations?: string[] | IJsonQueryRelation[];
  where?: IJsonQueryWhere<TEntity>;
}

export interface IQuery<TEntity = ObjectLiteral> {
  query?: IJsonQuery<TEntity>;
}
