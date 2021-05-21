import React, {useEffect, useState} from 'react';
import {SearchPannel} from './search-pannel';
import {List} from './list';
import {useDebounce, cleanObject} from '../../utils/helper';
import styled from '@emotion/styled';
import {useHttp} from '../../utils/request';
import {Typography, Button, Row} from 'antd';
import {useAsync} from '../../utils/useAsync';
import {Project} from '../../utils/interface';
import {useProjects} from '../../utils/project';
import {useUsers} from '../../utils/user';
import {useUrlQueryParam} from '../../utils/url';
import {useProjectsSearchParams} from './util';
import {useDispatch} from 'react-redux';
import {projectListActons} from './project-list.slice';
export const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: '',
  //   personId: '',
  // });

  // const [param, setSearchParams] = useUrlQueryParam(['name', 'personId']);
  // const projectsParam = {
  //   ...param,
  //   personId: Number(param.personId) || undefined,
  // };

  const [params, setSearchParams] = useProjectsSearchParams();
  // 因为使用可泛型，所以debounceParam类型与param类型一致
  const debounceParam = useDebounce(params, 2000);
  // const [list, setList] = useState([]);
  // const [users, setUsers] = useState([]);
  // 加载状态
  // const [isLoading, setIsLoading] = useState(false);
  // 异常处理
  // const [error, setError] = useState<null | Error>(null);
  // const client = useHttp();
  // const {run, isLoading, error, data: list} = useAsync<Project[]>();
  const {isLoading, error, data: list, retry} = useProjects(debounceParam);
  // 搜索参数变化调用接口获取数据projects
  // useEffect(() => {
  //   // let URL = `${apiURL}/projects?name=${debounceParam.name}&personId=${debounceParam.personId}`;
  //   // if (debounceParam.name === '' && debounceParam.personId !== '') {
  //   //   URL = `${apiURL}/projects?personId=${debounceParam.personId}`;
  //   // }
  //   // if (debounceParam.name !== '' && debounceParam.personId === '') {
  //   //   URL = `${apiURL}/projects?name=${debounceParam.name}`;
  //   // }
  //   // if (debounceParam.name === '' && debounceParam.personId === '') {
  //   //   URL = `${apiURL}/projects`;
  //   // }
  //   // setIsLoading(true);
  //   // client('projects', {data: cleanObject(debounceParam)})
  //   //   .then(setList)
  //   //   .catch((error) => {
  //   //     setError(error);
  //   //     setList([]);
  //   //   })
  //   //   .finally(() => {
  //   //     setIsLoading(false);
  //   //   });

  //   // fetch(URL).then(async (response) => {
  //   //   if (response.ok) {
  //   //     console.log(response);
  //   //     setList(await response.json());
  //   //   }
  //   // });

  //   run(client('projects', {data: cleanObject(debounceParam)}));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceParam]);
  // 调用接口获取USER
  // useEffect(() => {
  //   // fetch(`${apiURL}/users`).then(async (response) => {
  //   //   if (response.ok) {
  //   //     setUsers(await response.json());
  //   //   }
  //   // });
  //   client('users').then(setUsers);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const dispatch = useDispatch();
  const {data: users} = useUsers();
  return (
    <Container>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <Button
          onClick={() => {
            dispatch(projectListActons.openProjectModal());
          }}
        >
          创建项目
        </Button>
        {/* {props.projectButton} */}
      </Row>
      <SearchPannel
        param={params}
        setParam={setSearchParams}
        users={users || []}
      ></SearchPannel>
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        // setProjectModalOpen={props.setProjectModalOpen}
        // projectButton={props.projectButton}
      ></List>
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = true;
// class Text extends React.Component<any, any> {  类组件的写法
//   static whyDidYouRender = true;
// }
const Container = styled.main`
  padding: 20px;
`;
