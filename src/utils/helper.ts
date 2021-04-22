import {useState, useEffect} from 'react';
import {doc} from 'prettier';
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === '';

// TS中的object函数类型比较广泛，函数可以是object类型，正则表达式也可以是，如果想限制{a:b}这种格式的，可以使用以下方法:
// object: {[key: string]: unknown}

export const cleanObject = (object: {[key: string]: unknown}) => {
  // Object.assign({}, object)
  const result = {...object};
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

//
export const deBounce = (func: (val: unknown) => void, delay: number) => {
  let timeId: any;
  return function (value: unknown) {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      func(value);
    }, delay);
  };
};

// 对useDebounce添加了泛型
export const useDebounce = <V>(value: V, delay?: number): V => {
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

// 有时候我们不知道返回值的类型，这时候需要通过泛型，根据传入的参数类型推断出返回值的类型，使用泛型即可
export const useArray = <V>(val: V[]) => {
  const [value, setValue] = useState(val);
  return {
    setValue,
    value,
    add: (item: V) => setValue([...value, item]),
    removeIndex: (index: number) => {
      const copyValue = [...value];
      copyValue.splice(index, 1);
      setValue(copyValue);
    },
    clear: () => {
      setValue([]);
    },
  };
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环，这个和usecallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
