import React from 'react';

export interface globalDataParams {
  a: number;
  add?: () => void;
}
//002:导出context仓库
export const globalData: globalDataParams = {
  a: 1,
};

// 001:React.createContext 创建context对象，可以传入一个默认值，这里传入context仓库
// 001:导出context对象
export const globalContext = React.createContext(globalData);

//003:导出修改函数
export const golobalActions = (self: React.Component) => ({
  add() {
    self.setState((state: globalDataParams) => ({
      a: state.a + 1,
    }));
  },
});
