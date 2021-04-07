import {useAuth} from '../../context/auth-context';
import React from 'react';
export const LoginScreen = () => {
  const {login, user} = useAuth();
  let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 使用类型断言as
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({username, password});
  };
  return (
    <form onSubmit={handlSubmit}>
      登录成功，用户名:{user?.name}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={'username'} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={'password'} />
      </div>
      <button type={'submit'}>登录</button>
    </form>
  );
};
