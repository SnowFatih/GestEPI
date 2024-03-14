import { useCallback, useEffect, useRef } from 'react';

import { useMountedRef } from './useMountedRef';

export type UseDebouncedCallbackReturn<Args extends unknown[]> = (...args: Args) => void;

/**
 * Debounce a {@param callback} so that it will only run
 * after a specified {@param timeout} has passed (in milliseconds).
 * If the debounced callback is run again, it will reset the
 * current timeout and start again with the new callback arguments.
 */
export function useDebouncedCallback<Args extends unknown[] = []>(callback: (...args: Args) => void, timeout = 0): UseDebouncedCallbackReturn<Args> {
  const isMounted = useMountedRef();
  const currentTimeout = useRef<ReturnType<typeof setTimeout>>();
  const cb = useRef(callback);

  cb.current = callback;

  const run = useCallback(
    (...args: Args) => {
      if (currentTimeout.current) {
        clearTimeout(currentTimeout.current);
      }

      currentTimeout.current = setTimeout(() => {
        if (isMounted.current) {
          cb.current(...args);
        }
      }, timeout);
    },
    [isMounted, timeout]
  );

  const cancel = useCallback(() => {
    if (currentTimeout.current) {
      clearTimeout(currentTimeout.current);
    }
  }, []);

  useEffect(() => {
    return cancel;
  }, [cancel, timeout, run]);

  return run;
}
