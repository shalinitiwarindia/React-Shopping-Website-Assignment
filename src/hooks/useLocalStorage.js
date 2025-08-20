import { useEffect, useState } from "react";

export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const x = localStorage.getItem(key);
      return x ? JSON.parse(x) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);

  return [state, setState];
}
