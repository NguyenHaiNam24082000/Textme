export const get = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const set = (key, value) => {
  localStorage.setItem(key, value);
};
export const remove = (key) => {
  localStorage.removeItem(key);
};
export const clear = () => {
  localStorage.clear();
};
export const getAll = () => {
  return localStorage;
};
export const getAllKeys = () => {
  return Object.keys(localStorage);
};
export const getAllValues = () => {
  return Object.values(localStorage);
};
export const getAllEntries = () => {
  return Object.entries(localStorage);
};
export const getAllKeysAndValues = () => {
  return Object.entries(localStorage).map(([key, value]) => {
    return { key, value };
  });
};
