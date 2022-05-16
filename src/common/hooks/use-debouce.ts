import type { Dispatch, SetStateAction } from 'react';
import { useState, useCallback, useRef } from 'react';

/**
 * This hook need for reduce call state change
 */
const useDebounce = <TValue>(
  delay: number,
  initValue: TValue | (() => TValue),
): [TValue, Dispatch<SetStateAction<TValue>>] => {
  const [value, setValue] = useState<TValue>(initValue);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const setDebouncedValue = useCallback(
    (newValue: TValue) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => setValue(newValue), delay);
    },
    [delay],
  );

  return [value, setDebouncedValue];
};

export default useDebounce;
