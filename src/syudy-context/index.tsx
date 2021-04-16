import React, {Component} from 'react';
import Father from './father';

// react context 提供者和消费者的概念来创建的
import {
  globalData,
  globalContext,
  globalDataParams,
  golobalActions,
} from './grobal';
// 将提供者从globalContext 中结构出来
const {Provider} = globalContext;
// interface Index {
//   state: globalDataParams;
// }
export default class Index extends Component<any, globalDataParams> {
  constructor(props: object) {
    super(props);
    this.state = {
      ...globalData,
      ...golobalActions(this),
    };
  }
  render() {
    return (
      // Provider提供给外界使用的真正的公共仓库  value={真正的公共仓库}
      <Provider value={this.state}>
        <div className="stu-app">
          <h1>我是APP组件</h1>
          <Father></Father>
        </div>
      </Provider>
    );
  }
}
