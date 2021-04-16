import React, {Component} from 'react';
import {globalContext} from './grobal';
// 消费者 获取数据方式二
const {Consumer} = globalContext;
export default class Son extends Component {
  render() {
    return (
      <div className="stu-son">
        <h2>我是son组件</h2>
        {/* 获取数据方式一 */}
        {/* <span>{this.context.a}</span> */}
        {/* 获取数据方式二 */}
        <Consumer>{(value) => value.a}</Consumer>
        <Consumer>
          {(value) => (
            <div>
              <button
                onClick={() => {
                  value.add && value.add();
                }}
              >
                点我加一
              </button>
            </div>
          )}
        </Consumer>
      </div>
    );
  }
}
// 获取数据方式一
// Son.contextType = globalContext;
