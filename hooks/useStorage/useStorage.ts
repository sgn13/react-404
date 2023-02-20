import { useCallback, useState, useEffect } from "react";

export type useStateArgType<T> = T | (() => T) | undefined;

// key must be string but value should be generic
export function useLocalStorage<T>(key: string, initialValue: T) {
  return useStorage(key, initialValue, window?.localStorage);
}

export function useSessionStorage<T>(key: string, initialValue: T) {
  return useStorage(key, initialValue, window?.sessionStorage);
}

function useStorage<T>(key: string, initialValue: T, storageObject: Storage) {
  const [value, setValue] = useState<useStateArgType<T>>(() => {
    try {
      if (!storageObject) return initialValue;
      // if the value for the key already exists, return it.
      const jsonValue = storageObject.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);

      // if initialValue exists return it, otherwise if it is a function then execute it and return its value;
      if (typeof initialValue === "function") {
        return initialValue();
      } else {
        return initialValue;
      }
    } catch (err) {
      console.error("error in useStorage", err);
      return initialValue;
    }
  });

  useEffect(() => {
    if (!storageObject) return;
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  // doing this so that we always return something which is renderable
  let returnValue = value && typeof value !== "function" ? JSON.parse(value) : undefined;

  return [returnValue, setValue, remove] as const;
}
