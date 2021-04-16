import React from 'react';
import {Input, Select} from 'antd';
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
      <Input
        type="text"
        value={param.name}
        onChange={(evt) => {
          setParam({
            ...param,
            name: evt.target.value,
          });
        }}
      />
      <Select
        id=""
        value={param.personId}
        onChange={(value) => {
          setParam({
            ...param,
            personId: value,
          });
        }}
      >
        <Select.Option value="">负责人</Select.Option>
        {users.map((user) => {
          return (
            <Select.Option key={user.id + 'sear'} value={user.id}>
              {user.name}
            </Select.Option>
          );
        })}
      </Select>
    </form>
  );
};
