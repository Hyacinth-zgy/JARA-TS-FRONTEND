import React from 'react';
import {useAuth} from '../../context/auth-context';
import {Form, Input} from 'antd';
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
    // onSubmit={handlSubmit}
    <Form>
      登录成功，用户名:{user?.name}
      <Form.Item name={'username'}>
        <label htmlFor="username">用户名</label>
        <Input type="text" placeholder={'用户名'} id={'username'} />
      </Form.Item>
      <Form.Item>
        <label htmlFor="password">密码</label>
        <Input type="password" placeholder={'密码'} id={'password'} />
      </Form.Item>
      <button type={'submit'}>登录</button>
    </Form>
  );
};
