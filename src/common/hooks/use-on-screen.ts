import type { MutableRefObject } from 'react';
import { useEffect, useState } from 'react';

/**
 * This hook used when you need track visible state element on viewport
 */
const useOnScreen = <TElement extends Element | null>(
  ref: MutableRefObject<TElement>,
  rootMargin = '0px',
): boolean => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );

    const refElement = ref.current;

    if (refElement) {
      observer.observe(refElement);
    }

    return () => {
      if (!refElement) {
        return;
      }

      observer.unobserve(refElement);
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
};

export default useOnScreen;
