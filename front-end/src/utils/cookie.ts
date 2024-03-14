import Cookies from 'js-cookie';

export const setCookie = (key: string, payload: string) => {
  Cookies.set(key, payload);
};

export const getCookie = (key: string): string | null => {
  return Cookies.get(key) ?? null;
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
