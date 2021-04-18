import React from 'react';
import {useAuth} from '../../context/auth-context';
import {Form, Input, Button} from 'antd';
import styled from '@emotion/styled';
export const LoginScreen = () => {
  const {login, user} = useAuth();
  // 使用原生时的值获取和提交
  // let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  // handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   console.log(1);
  //   event.preventDefault();
  //   // 使用类型断言as
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({username, password});
  // };
  // 使用ant-d的handlSubmit
  let handlSubmit: (value: {username: string; password: string}) => void;
  handlSubmit = (value) => {
    login(value);
  };
  return (
    <Form onFinish={handlSubmit}>
      <Form.Item
        name={'username'}
        rules={[{required: true, message: '请输入用户名'}]}
      >
        <Input placeholder={'用户名'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{required: true, message: '请输入密码'}]}
      >
        <Input placeholder={'密码'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={'submit'} type={'primary'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

const LongButton = styled(Button)`
  width: 100%;
`;
