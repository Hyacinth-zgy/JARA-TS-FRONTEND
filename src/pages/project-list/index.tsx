import React, {useEffect, useState} from 'react';
import {SearchPannel} from './search-pannel';
import {List} from './list';
import {useDebounce} from '../../utils/helper';
const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debounceParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  // 搜索参数变化调用接口获取数据projects
  useEffect(() => {
    let URL = `${apiURL}/projects?name=${debounceParam.name}&personId=${debounceParam.personId}`;
    if (debounceParam.name === '' && debounceParam.personId !== '') {
      URL = `${apiURL}/projects?personId=${debounceParam.personId}`;
    }
    if (debounceParam.name !== '' && debounceParam.personId === '') {
      URL = `${apiURL}/projects?name=${debounceParam.name}`;
    }
    if (debounceParam.name === '' && debounceParam.personId === '') {
      URL = `${apiURL}/projects`;
    }
    fetch(URL).then(async (response) => {
      if (response.ok) {
        console.log(response);
        setList(await response.json());
      }
    });
  }, [debounceParam]);
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
