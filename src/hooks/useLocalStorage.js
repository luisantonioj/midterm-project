import { useState, useEffect } from "react";

/**
 * useLocalStorage hook - robust version
 * key: localStorage key
 * initialValue: default value (can be primitive, object, or a function returning the default)
 *
 * Notes:
 * - Checks for window/localStorage availability (safe for SSR-like environments)
 * - If initialValue is a function, it will be evaluated lazily (like useState)
 */
export default function useLocalStorage(key, initialValue) {
  const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

  const readValue = () => {
    try {
      if (!isBrowser) {
        // fallback for non-browser (server) environments
        return typeof initialValue === "function" ? initialValue() : initialValue;
      }
      const raw = window.localStorage.getItem(key);
      if (raw === null) {
        return typeof initialValue === "function" ? initialValue() : initialValue;
      }
      return JSON.parse(raw);
    } catch (err) {
      console.error("useLocalStorage: read error for key", key, err);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  };

  const [state, setState] = useState(readValue);

  useEffect(() => {
    try {
      if (!isBrowser) return;
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error("useLocalStorage: write error for key", key, err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, state]);

  return [state, setState];
}
