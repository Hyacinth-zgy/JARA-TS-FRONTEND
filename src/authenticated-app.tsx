import React from 'react';
import {ProjectListScreen} from './pages/project-list/index';
import {useAuth} from './context/auth-context';
import styled from '@emotion/styled';
import {Row} from './components/libs';
export const AuthenticatedApp = () => {
  const {logout} = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <div>Logo</div>
          <div>项目</div>
          <div>用户</div>
        </HeaderLeft>
        <HeaderRight>
          <button
            onClick={() => {
              logout();
            }}
          >
            退出
          </button>
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
  grid-row-gap: 10rem;
`;

// 已被下面方法抽取
const Header = styled(Row)`
  grid-area: header;
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
