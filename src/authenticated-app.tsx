import React from 'react';
import {ProjectListScreen} from './pages/project-list/index';
import {useAuth} from './context/auth-context';
import styled from '@emotion/styled';
import {Row} from './components/libs';
import Logo from '../src/assets/images/logon.png';
import {Dropdown, Menu, Button} from 'antd';
import {Helmet} from 'react-helmet';
export const AuthenticatedApp = () => {
  const {logout, user} = useAuth();
  return (
    <Container>
      <Helmet>
        <title>项目列表</title>
      </Helmet>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <LogoCom />
          <div>项目</div>
          <div>用户</div>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'logout'}>
                  <Button onClick={logout} type={'link'}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={'link'} onClick={(e) => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      {/* <Nav>nav</Nav> */}
      <Main>
        <ProjectListScreen />
      </Main>
      {/* <Aside>asisde</Aside> */}
      <Footer>Footer</Footer>
    </Container>
  );
};

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
  grid-auto-columns: 20rem 1fr 20rem;
  grid-template-areas:
    'header header header'
    'main main main'
    'footer footer footer';
  /* grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer'; */
  /* grid-row-gap: 10rem; */
`;

// 已被下面方法抽取
const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
`;

const HeaderLeft = styled(Row)`
  font-size: 18px;
  font-weight: 700;
`;
const HeaderRight = styled.div`
  grid-area: header;
`;
// const Nav = styled.nav`
//   grid-area: nav;
// `;
const Main = styled.main`
  grid-area: main;
`;
// const Aside = styled.aside`
//   grid-area: aside;
// `;
const Footer = styled.footer`
  grid-area: footer;
`;

const LogoCom = styled.div`
  background: url(${Logo}) no-repeat center;
  width: 18rem;
  height: 6rem;
  background-size: 18rem 6rem;
`;
