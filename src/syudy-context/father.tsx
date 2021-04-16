import React, {Component} from 'react';
import Son from './son';

export default class Father extends Component {
  render() {
    return (
      <div className="stu-father">
        <h2>我是father组件</h2>
        <Son></Son>
      </div>
    );
  }
}
