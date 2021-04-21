import React from 'react';
import {useAuth} from '../../context/auth-context';
import {Form, Input, Button} from 'antd';
import styled from '@emotion/styled';
import {useAsync} from '../../utils/useAsync';
interface onErrorFace {
  (error: Error | null): void;
}
export const LoginScreen = ({onError}: {onError: onErrorFace}) => {
  const {login, user} = useAuth();
  const {run, isLoading} = useAsync(undefined, {throwOnError: true});
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
  handlSubmit = async (value) => {
    try {
      // await login(value)
      await run(login(value)); // 使用useAsync 改造
    } catch (e) {
      onError(e);
    }
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
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

const LongButton = styled(Button)`
  width: 100%;
`;
