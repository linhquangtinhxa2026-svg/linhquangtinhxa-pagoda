import { useCallback, useRef } from "react";

export function useDebouncedCallback<T extends (...args: never[]) => unknown>(
  fn: T,
  delay = 500
): T {
  const lastCall = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        return fn(...args);
      }
    },
    [fn, delay]
  ) as T;
}
