import {useState, useEffect} from 'react';

export const clearObject = (obj: object) => {
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
export const deBounce = (func: (val: any) => void, delay: number) => {
  let timeId: any;
  return function (value: any) {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      func(value);
    }, delay);
  };
};

export const useDebounce = (value: any, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次value变化以后设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 上一个useEffect执行完后会执行返回的方法，用来清理timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debounceValue;
};
