import React from 'react';
import {Link} from 'react-router-dom';
import {Routes, Route, Router, Navigate} from 'react-router';
import {KanbanScreen} from '../kanan';
import {EpicScreen} from '../epic';
export const ProjectScreen = () => {
  return (
    <div>
      <h1>我是ProjectScreen</h1>;
      {/* Link的to会建立在父路由的基础上   to后面不能写 / ，link的to的路由代跟路由 */}
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen />}></Route>
        <Route path={'/epic'} element={<EpicScreen />}></Route>
        {/* 当在这个子路由下没有匹配到任何路由就会跳转到Navigate定义的路由: */}
        <Navigate to={window.location.pathname + '/kanban'}></Navigate>
      </Routes>
    </div>
  );
};
