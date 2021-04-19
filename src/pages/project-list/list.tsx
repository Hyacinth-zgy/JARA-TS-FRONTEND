import React from 'react';
import {User} from './search-pannel';
import {Table, TableProps} from 'antd';
import dayjs from 'dayjs';
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

// 原来
// interface listProps {
//   list: Project[];
//   users: User[];
// }

// 改造:listProps  使得listProps上会有table上的所有属性
interface listProps extends TableProps<Project> {
  users: User[];
}
// 原来
// export const List = ({list, users}: listProps) => {
// 改造
export const List = ({users, ...props}: listProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '部门',
          dataIndex: 'organization',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => {
                  return user.id === project.personId;
                })?.name || ''}
              </span>
            );
          },
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            );
          },
        },
      ]}
      // 原来
      // dataSource={list}
      // 改造
      {...props}
    ></Table>
  );
  // 原生写法
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project, index) => {
  //         return (
  //           <tr key={index}>
  //             <td>{project.name}</td>
  //             <td>
  //               {users.find((user) => {
  //                 return user.id === project.personId;
  //               })?.name || ''}
  //             </td>
  //           </tr>
  //         );
  //       })}
  //     </tbody>
  //   </table>
  // );
};
