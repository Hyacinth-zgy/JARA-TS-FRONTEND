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
    let URL = `${apiURL}/projects?name=${param.name}&personId=${param.personId}`;
    if (param.name === '' && param.personId !== '') {
      URL = `${apiURL}/projects?personId=${param.personId}`;
    }
    if (param.name !== '' && param.personId === '') {
      URL = `${apiURL}/projects?name=${param.name}`;
    }
    if (param.name === '' && param.personId === '') {
      URL = `${apiURL}/projects`;
    }
    fetch(URL).then(async (response) => {
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
