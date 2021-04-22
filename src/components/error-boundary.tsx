//本文件用来处理边缘错误
// https://github.com/bvaughn/react-error-boundary  React自带的处理边缘错误的库
import React, {ReactNode} from 'react';
// P = {}, S = {}  REACT 中的约定俗成:P代表prop的泛型，S代表state的泛型
type FallbackRender = (props: {error: Error | null}) => React.ReactElement;
interface propsInterface {
  children: ReactNode;
  fallbackRender: FallbackRender;
}
interface stateInterface {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  // 原本:
  // propsInterface,
  // stateInterface
  // 改造:
  React.PropsWithChildren<{fallbackRender: FallbackRender}>,
  stateInterface
> {
  state = {error: null};

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return error;
  }

  render() {
    const {error} = this.state;
    const {fallbackRender, children} = this.props;
    if (error) {
      return fallbackRender({error});
    }
    return children;
  }
}
