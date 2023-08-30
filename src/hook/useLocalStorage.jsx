import { useState, useEffect } from "react";

export default function useLocalStorage(key, initValue) {
  const [value, setValue] = useState(() => {
    try {
      const getValue = window.localStorage.getItem(key);
      return getValue ? JSON.parse(getValue) : initValue;
    } catch (error) {
      console.log(error);
      return initValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, [JSON.stringify(value)]);
  }, [key, value]);

  return [value, setValue];
}
