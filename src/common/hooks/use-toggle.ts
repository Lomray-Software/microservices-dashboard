import { useCallback, useMemo, useState } from 'react';

/**
 * Switch for true false
 */
const useToggle = (initialState = false): [boolean, () => void] => {
  const [isValue, setIsValue] = useState(initialState);
  const toggle = useCallback(() => setIsValue((prevState) => !prevState), []);

  return useMemo(() => [isValue, toggle], [isValue, toggle]);
};

export default useToggle;
