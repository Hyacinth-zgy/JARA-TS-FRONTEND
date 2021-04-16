import React from 'react';
import {User} from './search-pannel';
import {Table} from 'antd';
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
interface listProps {
  list: Project[];
  users: User[];
}
export const List = ({list, users}: listProps) => {
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
      ]}
      dataSource={list}
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
