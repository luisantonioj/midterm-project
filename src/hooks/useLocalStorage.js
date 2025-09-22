import { useState, useEffect } from "react";

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
