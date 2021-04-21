import {User, loginParam} from './utils/interface';

const apiURL = process.env.REACT_APP_API_URL;
const localStorageKey = '__auth_provider_token__';

export const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

// user属性是User类型
export const handleUserResponse = ({user}: {user: User}) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
};

export let login: (data: loginParam) => Promise<User | never>;
login = (data: loginParam) => {
  return fetch(`${apiURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// Promise是一个泛型接口
export const register = (data: loginParam): Promise<User | never> => {
  return fetch(`${apiURL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);

// 多个返回值
export const addNumber = (value: number): number | boolean => {
  if (value === 1) {
    return value;
  }
  return false;
};
