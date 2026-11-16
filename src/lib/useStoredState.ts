import { useCallback, useState } from 'react';

/** One-off read of a stored value, for components that only display it. */
export function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/**
 * useState that remembers its value in localStorage (no cookies). If storage
 * is blocked, for example in private browsing, it works as plain state.
 */
export function useStoredState<T>(key: string, fallback: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => readStored(key, fallback));

  const store = useCallback(
    (next: T) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Storage unavailable: keep the value for this visit only.
      }
    },
    [key],
  );

  return [value, store];
}
