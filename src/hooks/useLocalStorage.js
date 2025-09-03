import { useState, useEffect } from "react";

/**
 * useLocalStorage hook
 * key: localStorage key
 * initialValue: default value
 */
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (e) {
      console.error("useLocalStorage parse error:", e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error("useLocalStorage write error:", e);
    }
  }, [key, state]);

  return [state, setState];
}
