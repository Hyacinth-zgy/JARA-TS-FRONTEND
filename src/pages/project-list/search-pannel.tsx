import React from 'react';
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps['param']) => void;
}
export const SearchPannel = ({param, setParam, users}: SearchPanelProps) => {
  return (
    <form action="">
      <input
        type="text"
        value={param.name}
        onChange={(evt) => {
          setParam({
            ...param,
            name: evt.target.value,
          });
        }}
      />
      <select
        name=""
        id=""
        value={param.personId}
        onChange={(evt) => {
          setParam({
            ...param,
            personId: evt.target.value,
          });
        }}
      >
        <option value="">负责人</option>
        {users.map((user) => {
          return (
            <option key={user.id + 'sear'} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
