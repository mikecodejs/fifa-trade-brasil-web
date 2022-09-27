export const setItem = (key: string, value: string) =>
  new Promise((resolve) => {
    resolve(localStorage.setItem(key, value));
  });

export const getItem = (key: string) =>
  new Promise((resolve) => {
    resolve(localStorage.getItem(key));
  });
