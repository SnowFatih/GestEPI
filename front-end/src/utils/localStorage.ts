export const setInLocalStorage = (key: string, payload: string) => {
  localStorage.setItem(key, payload);
};

export const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
