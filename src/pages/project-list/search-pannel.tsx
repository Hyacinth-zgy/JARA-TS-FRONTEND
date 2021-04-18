// /** '@jsx' jsx */
// import {jsx} from '@emotion/react'; // 支持css={{marginBottom: '2rem', '>*': ''}}
import React from 'react';
import {Input, Select, Form} from 'antd';
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
    <Form
      action=""
      layout={'inline'}
      // css={{marginBottom: '2rem', '>*': '', '>span': {background: 'red'}}}
      style={{marginBottom: '2rem'}}
    >
      <Form.Item>
        <Input
          type="text"
          placeholder={'项目名'}
          value={param.name}
          onChange={(evt) => {
            setParam({
              ...param,
              name: evt.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
    </Form>
  );
};
