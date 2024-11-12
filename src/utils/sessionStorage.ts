export const getSessionStorage = (queryStorage: string) => {
  return sessionStorage.getItem(queryStorage);
};

export const saveSessionStorage = (queryStorage: string, value: string) => {
  return sessionStorage.setItem(queryStorage, value);
};
