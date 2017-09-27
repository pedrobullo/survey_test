export default {
  set: (key, value) => {
    if (!key || !value) {
      return;
    }
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
    return localStorage.setItem(key, stringValue); // eslint-disable-line
  },
  get: (key) => {
    const value = localStorage.getItem(key);

    if (!value) {
      return;
    }

    return value[0] === '{' ? JSON.parse(value) : value; // eslint-disable-line
  },
};
