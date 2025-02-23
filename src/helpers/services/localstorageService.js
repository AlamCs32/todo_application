const localstorageService = {};

localstorageService.set = (key, value) => {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
};

localstorageService.get = (key) => {
  const value = localStorage.getItem(key);
  if (value === undefined) {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

localstorageService.clear = () => {
  localStorage.clear();
};

localstorageService.remove = (key) => {
  localStorage.removeItem(key);
};

export { localstorageService };
