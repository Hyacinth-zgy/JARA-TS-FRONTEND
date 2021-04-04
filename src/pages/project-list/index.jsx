import React, {useEffect, useState} from 'react';
import {SearchPannel} from './search-pannel';
import {List} from './list';
const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  // 搜索参数变化调用接口获取数据projects
  useEffect(() => {
    fetch(
      `${apiURL}/projects?name=${param.name}&personId=${param.personId}`
    ).then(async (response) => {
      if (response.ok) {
        console.log(response);
        setList(await response.json());
      }
    });
  }, [param]);
  // 调用接口获取USER
  useEffect(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPannel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPannel>
      <List list={list} users={users}></List>
    </div>
  );
};
