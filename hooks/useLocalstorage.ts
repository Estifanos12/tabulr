import { useState } from 'react'

import { logger } from '../utils/log';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (x: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.error('Error getting item from local storage' + error);
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      logger.error('Error setting item in local storage' + error);
    }
  };

  return [storedValue, setValue];
}