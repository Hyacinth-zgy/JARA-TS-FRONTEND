import React, {useState} from 'react';
import {RegisterScreen} from './register';
import {LoginScreen} from './login';
import {Card, Divider} from 'antd';
// 引入CSS-IN-JS emotion
import styled from '@emotion/styled';
import logo from '../../assets/images/logo.png';
import loginBG from '../../assets/images/login-bg.jpg';
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    // 使用样式组件
    <Container>
      <Header />
      {/* <Card> */}
      {/* 替换Card组件 */}
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider></Divider>
        <a
          href="javascrit:void"
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          切换到{isRegister ? '已经有账号了，直接登录' : '没有账号，注册新账号'}
        </a>
        {/* </Card> */}
      </ShadowCard>
    </Container>
  );
};

const Title = styled.div`
  margin-bottom: 3.2rem;
  color: rgba(94, 108, 132);
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

// ant-组件:
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

// 原生html元素:创建样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: url(${loginBG}) no-repeat center;
  background-size: 100vw 100vh;
`;
