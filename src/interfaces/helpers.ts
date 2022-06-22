/**
 * Replace return type in provided function
 */
export type ReplaceReturnType<T extends (...a: any) => any, TNewReturn = void> = (
  ...a: Parameters<T>
) => TNewReturn;

/**
 * Replace return type in all properties of interface or type
 */
export type ReplacePropertiesReturnType<TP, TNewType = Promise<void> | void> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [key in keyof TP]: ReplaceReturnType<TP[key], TNewType>;
};

/**
 * Convert class type to class constructor
 */
export type ClassReturnType<T> = T extends new (...args: any) => infer R ? R : never;

/**
 * Stores map to type
 */
export type StoresType<TStores> = {
  [keys in keyof TStores]: ClassReturnType<TStores[keys]>;
};

export type TCallback = () => void;
