import { useState, useEffect } from "react";

/**
 * Custom hook that syncs state to localStorage.
 * Handles JSON serialization/deserialization and gracefully
 * falls back to initialValue on corrupted data.
 *
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Default value if nothing is stored or data is corrupted
 * @returns {[*, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        return { ...initialValue, ...JSON.parse(item) };
      }
    } catch {
      // Corrupted data — fall back to initialValue
    }
    return initialValue;
  });

  // Sync to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Storage full or unavailable — silently ignore
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
