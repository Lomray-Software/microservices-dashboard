import { useState } from 'react';

/**
 * Switch for true false
 */
const useToggle = (initialState = false): [boolean, () => void] => {
  const [isValue, setIsValue] = useState(initialState);
  const toggle = () => setIsValue(!isValue);

  return [isValue, toggle];
};

export default useToggle;
