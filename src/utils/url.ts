// 返回页面URL中指定键的参数值
import {useSearchParams} from 'react-router-dom';
import {useMemo} from 'react';

// 该hook是读取URL中的参数返回一个对应对象数据出去的能力HOOK
// export const useUrlQueryParam = (keys: string[]) => {
//   // useSearchParams 是reactrouter 提供的一个获取URL参数的HOOK，返回值是一个webAPI URLSearchParams类型 MDN可查询具体
//   const [searchParams, setSearchParams] = useSearchParams();
//   return [
//     keys.reduce((pre: {}, key: string) => {
//       return {
//         ...pre,
//         [key]: searchParams.get(key) || '',
//       };
//     }, {} as {[k in string]: string}),
//     setSearchParams,
//   ] as const;
// };

// 改造1
// 限制版  K 限制为string类型
// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   // useSearchParams 是reactrouter 提供的一个获取URL参数的HOOK，返回值是一个webAPI URLSearchParams类型 MDN可查询具体
//   const [searchParams, setSearchParams] = useSearchParams();
//   // 会不停返回新新的值，页面使用到可能会造成页面死循环更新
//   return [
//     keys.reduce((pre, key: K) => {
//       return {
//         ...pre,
//         [key]: searchParams.get(key) || '',
//       };
//     }, {} as {[k in K]: string}),
//     setSearchParams,
//   ] as const;
// };

// 改造2
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // useSearchParams 是reactrouter 提供的一个获取URL参数的HOOK，返回值是一个webAPI URLSearchParams类型 MDN可查询具体
  const [searchParams, setSearchParams] = useSearchParams();
  // 会不停返回新新的值，页面使用到可能会造成页面死循环更新
  return [
    useMemo(
      () =>
        keys.reduce((pre, key: K) => {
          return {
            ...pre,
            [key]: searchParams.get(key) || '',
          };
        }, {} as {[k in K]: string}),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [setSearchParams]
    ),
    setSearchParams,
  ] as const;
};