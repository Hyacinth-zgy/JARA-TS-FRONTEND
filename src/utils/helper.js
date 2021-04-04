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
