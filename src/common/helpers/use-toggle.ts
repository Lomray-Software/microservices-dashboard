import { useState } from 'react';

const useToggle = (initialState = false): [boolean, () => void] => {
  const [isValue, setIsValue] = useState(initialState);
  const toggle = () => setIsValue(!isValue);

  return [isValue, toggle];
};

export default useToggle;
