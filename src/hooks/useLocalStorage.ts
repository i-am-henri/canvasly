// source: https://gist.github.com/KristofferEriksson/4a948a1572f5eb7907c3430b58845a9a
import { useEffect, useState } from "react";

function useLocalStorage() {
  const [loadingStates, setLoadingStates] = useState<Map<string, boolean>>(
    new Map()
  );

  const setStorageValue = <T>(key: string, value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const getStorageValue = <T>(
    key: string,
    fallbackValue?: T
  ): [T | undefined, boolean] => {
    const [value, setStorageValue] = useState<T | undefined>(fallbackValue);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // biome-ignore lint: don't want to fix it now
    useEffect(() => {
      setIsLoading(loadingStates.get(key) ?? true);

      try {
        const item = window.localStorage.getItem(key);
        setStorageValue(item !== null ? JSON.parse(item) : fallbackValue);
      } catch (error) {
        console.error(error);
        setStorageValue(fallbackValue);
      } finally {
        setIsLoading(false);
        setLoadingStates((prev) => new Map(prev).set(key, false));
      }
    }, [key, fallbackValue, loadingStates]);

    return [value, isLoading];
  };

  // Effect to update component when localStorage changes
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key) {
        setLoadingStates((prev) =>
          new Map(prev).set(event.key as string, true)
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { getStorageValue, setStorageValue };
}

export default useLocalStorage;