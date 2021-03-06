import {useAuth} from '../../context/auth-context';
import React from 'react';
// const apiURL = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  // interface loginParam {
  //   username: string;
  //   password: string;
  // }
  // 此方法已被提取
  // let login: (param: loginParam) => void;
  // login = (param) => {
  //   refresh的API不支持此接口，所以要为JSONSERVER撰写中间件
  //   /register
  //   fetch(`${apiURL}/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(param),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //     }
  //   });
  // };

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
