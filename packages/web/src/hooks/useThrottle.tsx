import { useState, useRef, useEffect } from 'react';

// https://github.com/streamich/react-use/blob/master/src/useThrottle.ts

export function useThrottle<T>(value: T, ms: number = 200) {
  const [state, setState] = useState<T>(value);
  let timeout = useRef<any>(null);
  const nextValue = useRef(null) as any;
  const hasNextValue = useRef(0) as any;

  useEffect(() => {
    if (!timeout.current) {
      setState(value);
      const timeoutCallback = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false;
          setState(nextValue.current);
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = null;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextValue.current = value;
      hasNextValue.current = true;
    }
  }, [value]);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  return state;
}
