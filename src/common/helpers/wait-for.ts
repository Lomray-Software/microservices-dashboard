interface IWaitForOptions {
  freq?: number;
  maxAttempts?: number;
}

/**
 * Wait until condition has been set to true
 */
const waitFor = async <TCallback>(
  condition: () => boolean,
  callback: () => Promise<TCallback> | TCallback,
  options: IWaitForOptions = {},
): Promise<TCallback> => {
  const { freq = 150, maxAttempts = 25 } = options;
  let attempt = 1;

  while (!condition()) {
    if (maxAttempts === attempt) {
      break;
    }

    attempt += 1;

    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      setTimeout(resolve, freq);
    });
  }

  return callback();
};

export default waitFor;
