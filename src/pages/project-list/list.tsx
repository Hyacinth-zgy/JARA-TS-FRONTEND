import React from 'react';
import {User} from './search-pannel';
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
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project, index) => {
          return (
            <tr key={index}>
              <td>{project.name}</td>
              <td>
                {users.find((user) => {
                  return user.id === project.personId;
                })?.name || ''}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
