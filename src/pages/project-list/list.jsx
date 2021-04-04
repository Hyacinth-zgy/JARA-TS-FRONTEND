import React from 'react';
export const List = ({list, users}) => {
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
                  return (user.id === project.personId);
                })?.name || ''}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
