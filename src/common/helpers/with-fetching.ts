interface IInstance {
  setFetching: (isFetching: boolean) => void;
}

/**
 * Provide wrapper for control fetching state
 * @constructor
 */
const withFetching =
  <TReturn>(callback: () => Promise<TReturn>, instance: IInstance): (() => Promise<TReturn>) =>
  async () => {
    instance.setFetching(true);

    const result = await callback();

    instance.setFetching(false);

    return result;
  };

export default withFetching;
