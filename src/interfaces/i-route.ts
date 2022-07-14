import type { AsyncRouteProps } from '@lomray/after';
import type ROUTE from '@constants/routes';

export type RouteKeys = keyof typeof ROUTE;

type IRouteParams<TKey extends RouteKeys> = typeof ROUTE[TKey] extends {
  PARAMS: Record<string, any>;
}
  ? typeof ROUTE[TKey]['PARAMS']
  : undefined;

type RequiredFieldsOnly<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type OptionalFieldsOnly<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]: T[K];
};

export type IParams<TRouteKey extends RouteKeys> = {
  [field in keyof RequiredFieldsOnly<IRouteParams<TRouteKey>>]: string;
} & {
  [field in keyof OptionalFieldsOnly<IRouteParams<TRouteKey>>]?: string;
};

export interface IRoute extends AsyncRouteProps {
  isPublic?: boolean;
  isOnlyGuest?: boolean;
}
