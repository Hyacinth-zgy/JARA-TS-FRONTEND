import {useAuth} from '../../context/auth-context';
import React from 'react';
import {Form, Input, Button} from 'antd';
import styled from '@emotion/styled';
import {useAsync} from '../../utils/useAsync';
interface onErrorFace {
  (error: Error | null): void;
}
export const RegisterScreen = ({onError}: {onError: onErrorFace}) => {
  const {register} = useAuth();
  const {run, isLoading} = useAsync(undefined, {throwOnError: true});
  // 原生button写的
  // let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  // handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // 使用类型断言as
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   register({username, password});
  // };

  let handlSubmit: ({
    cpassWord,
    ...value
  }: {
    username: string;
    password: string;
    cpassWord: string;
  }) => void;
  handlSubmit = async ({cpassWord, ...value}) => {
    if (cpassWord !== value.password) {
      onError(new Error('密码输入不一致'));
      return;
    }
    try {
      await run(register(value));
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
      <Form.Item
        name={'cpassword'}
        rules={[{required: true, message: '请确认密码'}]}
      >
        <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

const LongButton = styled(Button)`
  width: 100%;
`;
