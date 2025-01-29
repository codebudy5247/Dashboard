export const useLocalStorage = (key: string) => {
  /**
   * Stores a value in the local storage under the specified key.
   *
   * @param value - The value to be stored. It will be serialized to a JSON string.
   * @throws Will log an error to the console if the storage operation fails.
   */
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Retrieves an item from the local storage.
   */
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Removes an item from local storage by the specified key.
   */
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};
