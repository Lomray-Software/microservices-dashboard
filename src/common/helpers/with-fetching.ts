interface IStoreInstance {
  setFetching: TFetching;
}

type TFetching = (isFetching: boolean) => void;
type TCallback<TReturn> = (...args: any[]) => Promise<TReturn>;
type TWithFetching = <TReturn, TInstance extends IStoreInstance>(
  callback: TCallback<TReturn>,
  instance: TInstance,
) => () => Promise<TReturn>;
type TWithFetchingNamed = <TReturn, TInstance extends Record<any, any>>(
  callback: TCallback<TReturn>,
  instance: TInstance,
  funcName: keyof TInstance,
) => () => Promise<TReturn>;

/**
 * Provide wrapper for control fetching state (used named function)
 * @constructor
 */
const withFetchingNamed: TWithFetchingNamed =
  (callback, instance, funcName) =>
  async (...args: any[]) => {
    instance[funcName](true);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = await callback(...args);

    instance[funcName](false);

    return result;
  };

/**
 * Provide wrapper for control fetching state (used default function name: setFetching)
 * @constructor
 */
const withFetching: TWithFetching = (callback, instance) =>
  withFetchingNamed(callback, instance, 'setFetching');

export { withFetching, withFetchingNamed };
