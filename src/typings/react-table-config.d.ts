/* eslint-disable @typescript-eslint/naming-convention */
import type {
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseRowStateCellProps,
  UseRowStateInstanceProps,
  UseRowStateOptions,
  UseRowStateRowProps,
  UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
  UseTableHeaderGroupProps,
} from 'react-table';
import type { IJsonQueryFieldType } from '@store/endpoints/interfaces/common/query';

declare module 'react-table' {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  // @ts-ignore
  export interface TableOptions<TD extends Record<string, unknown>>
    extends UseExpandedOptions<TD>,
      UseFiltersOptions<TD>,
      UseGlobalFiltersOptions<TD>,
      UseGroupByOptions<TD>,
      UsePaginationOptions<TD>,
      UseResizeColumnsOptions<TD>,
      UseRowSelectOptions<TD>,
      UseRowStateOptions<TD>,
      UseSortByOptions<TD>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, any> {}

  // @ts-ignore
  export interface Hooks<TD extends Record<string, unknown> = Record<string, unknown>>
    extends UseExpandedHooks<TD>,
      UseGroupByHooks<TD>,
      UseRowSelectHooks<TD>,
      UseSortByHooks<TD> {}

  // @ts-ignore
  export interface TableInstance<TD extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderInstanceProps<TD>,
      UseExpandedInstanceProps<TD>,
      UseFiltersInstanceProps<TD>,
      UseGlobalFiltersInstanceProps<TD>,
      UseGroupByInstanceProps<TD>,
      UsePaginationInstanceProps<TD>,
      UseRowSelectInstanceProps<TD>,
      UseRowStateInstanceProps<TD>,
      UseSortByInstanceProps<TD> {}

  // @ts-ignore
  export interface TableState<TD extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderState<TD>,
      UseExpandedState<TD>,
      UseFiltersState<TD>,
      UseGlobalFiltersState<TD>,
      UseGroupByState<TD>,
      UsePaginationState<TD>,
      UseResizeColumnsState<TD>,
      UseRowSelectState<TD>,
      UseRowStateState<TD>,
      UseSortByState<TD> {}

  // @ts-ignore
  export interface ColumnInterface<TD extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnOptions<TD>,
      UseGlobalFiltersColumnOptions<TD>,
      UseGroupByColumnOptions<TD>,
      UseResizeColumnsColumnOptions<TD>,
      UseSortByColumnOptions<TD> {}

  // @ts-ignore
  export interface ColumnInstance<TD extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnProps<TD>,
      UseGroupByColumnProps<TD>,
      UseResizeColumnsColumnProps<TD>,
      UseSortByColumnProps<TD> {}

  // @ts-ignore
  export interface Cell<TD extends Record<string, unknown> = Record<string, unknown>>
    extends UseGroupByCellProps<TD>,
      UseRowStateCellProps<TD> {}

  // @ts-ignore
  export interface Row<TD extends Record<string, unknown> = Record<string, unknown>>
    extends UseExpandedRowProps<TD>,
      UseGroupByRowProps<TD>,
      UseRowSelectRowProps<TD>,
      UseRowStateRowProps<TD> {}

  // @ts-ignore
  export interface HeaderGroup<D extends Record<string, any>>
    extends ColumnInstance<D>,
      UseTableHeaderGroupProps<D> {
    filterParams?: {
      type?: 'text' | 'number';
      castType?: IJsonQueryFieldType;
    };
  }
}
