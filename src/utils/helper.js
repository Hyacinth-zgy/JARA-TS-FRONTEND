export const clearObject = (obj) => {
  const objData = JSON.parse(JSON.stringify(obj));
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (objData[key] === '') {
      delete objData[key];
    }
  });
  return objData;
};

//
export const deBounce = (func, delay) => {
  let timeId;
  return function (value) {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      func(value);
    }, delay);
  };
};
