import * as auth from '../auth-provider';
import qs from 'qs';
import {useAuth} from '../context/auth-context';
import {type} from 'os';
const apiURL = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string | undefined | null;
  data?: object;
}

export const http = async (
  endpoint: string,
  {data, token, headers, ...customConfig}: Config = {} // 加个默认值之后代表传不传都可以
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({message: '请重新登录'});
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const {user} = useAuth();
  // return ([endpoint, config]: [string, Config]) => {
  // 讲解TS操作符
  // Parameters:取出函数中的参数类型
  return (...[endpoint, config]: Parameters<typeof http>) => {
    return http(endpoint, {...config, token: user && user.token});
  };
};

// 联合类型，有多个类型
let myFavoriateNumber: string | number;
myFavoriateNumber = 7;
myFavoriateNumber = '7';
let jackFavoriateNumber: string | number;
// 这里 myFavoriateNumber 和 jackFavoriateNumber 类型都是一样的，可以使用类型别名将类型抽取

// 类型别名:
type FavoriateNumber = string | number;
let roseFavoriateNumber: FavoriateNumber = 7;
let zgysFavoriateNumber: FavoriateNumber = '7';

//很多时候接口和类型别名可以互换
// interface Person {
//   name: string
// }
type Person = {name: string};
const xiaoMing: Person = {name: 'yxd'};

// 类型别名和接口的区别:
// 类型别名和接口有很多细微的区别，但是很多时候我们在开发过程中无法感知
// 主要两个区别:
// 1.类型别名定义联合类型，接口无法定义
// 2.类型别名定义交叉类型，接口无法定义
// 3.interface无法使用Utility Type(TS定义的工具类型:用来对type定义的数据类型做一些操作)

// Utility Type举例
type perSon = {
  name: string;
  age: number;
};

// 需求1:需要name和age可传可不传，但是不能使用？的方式
// 使用Utility Type Partial<Type>
const xiaoZhao: Partial<perSon> = {name: 'aaaa'}; // 只传名字

// 需求2:只需要age，但是没有name（传name就要错）,
// 使用Utility Type Partial Omit<Type，需要删除的属性>
const shenMiRen: Omit<Person, 'name' | 'age'> = {};

// Partial:的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};
