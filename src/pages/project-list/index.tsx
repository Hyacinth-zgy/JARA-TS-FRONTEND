import React, {useEffect, useState} from 'react';
import {SearchPannel} from './search-pannel';
import {List} from './list';
import {useDebounce, cleanObject} from '../../utils/helper';
import {useHttp} from '../../utils/request';
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  // 因为使用可泛型，所以debounceParam类型与param类型一致
  const debounceParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const client = useHttp();

  // 搜索参数变化调用接口获取数据projects
  useEffect(() => {
    // let URL = `${apiURL}/projects?name=${debounceParam.name}&personId=${debounceParam.personId}`;
    // if (debounceParam.name === '' && debounceParam.personId !== '') {
    //   URL = `${apiURL}/projects?personId=${debounceParam.personId}`;
    // }
    // if (debounceParam.name !== '' && debounceParam.personId === '') {
    //   URL = `${apiURL}/projects?name=${debounceParam.name}`;
    // }
    // if (debounceParam.name === '' && debounceParam.personId === '') {
    //   URL = `${apiURL}/projects`;
    // }
    client('projects', {data: cleanObject(debounceParam)}).then(setList);
    // fetch(URL).then(async (response) => {
    //   if (response.ok) {
    //     console.log(response);
    //     setList(await response.json());
    //   }
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);
  // 调用接口获取USER
  useEffect(() => {
    // fetch(`${apiURL}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
    client('users').then(setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
