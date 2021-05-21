import React, {useState} from 'react';
import {ProjectListScreen} from './pages/project-list/index';
import {useAuth} from './context/auth-context';
import styled from '@emotion/styled';
import {Row, ButtonNoPadding} from './components/libs';
import Logo from '../src/assets/images/logon.png';
import {Dropdown, Menu, Button} from 'antd';
import {Routes, Route, Navigate} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import {ProjectModal} from './pages/project-list/project-modal';
// import {Helmet} from 'react-helmet';
import {useDocumentTitle, resetRoute} from './utils/helper';
import {ProjectScreen} from './pages/project';
import {cursorTo} from 'readline';
import {ProjectPopover} from './components/project-popover';
export const AuthenticatedApp = () => {
  // const {logout, user} = useAuth();
  useDocumentTitle('项目列表', true);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}

      {/* 被抽取了为PageHeader: */}
      {/* <Header between={true}>
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
      </Header> */}
      <PageHeader
        projectButton={
          <ButtonNoPadding
            onClick={() => {
              setProjectModalOpen(true);
            }}
            type={'link'}
          >
            创建项目
          </ButtonNoPadding>
        }
        // setProjectModalOpen={setProjectModalOpen}
      />
      {/* <Nav>nav</Nav> */}
      <Main>
        {/* Routes需要被router包裹住 */}
        <Router>
          <Routes>
            <Route
              path={'/projects'}
              element={
                // <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
                //  projectButton 这种方式是一种component composition 模式
                //  就是讲业务模块提取来自己处理，然后将处理好的一种形式传递下去，子组件消费该处理好的内容，
                //  不需要将需要传递的数据一层一层的往下传
                //  介绍:https://react.docschina.org/docs/context.html

                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding
                      onClick={() => {
                        setProjectModalOpen(true);
                      }}
                      type={'link'}
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            ></Route>
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreen />}
            ></Route>
            {/* 当前组件路由没有匹配到就进入如下路由 */}
            <Navigate to={window.location.pathname + '/projects'}></Navigate>
          </Routes>
        </Router>
      </Main>
      {/* <Aside>asisde</Aside> */}
      <Footer>Footer</Footer>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
        }}
      ></ProjectModal>
    </Container>
  );
};

const PageHeader = (props: {
  // setProjectModalOpen: (isOpen: boolean) => void;
  projectButton: JSX.Element;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <LogoCom onClick={resetRoute} />
        {/* <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} /> */}
        <ProjectPopover {...props} />
        <div>用户</div>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const {logout, user} = useAuth();
  return (
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
