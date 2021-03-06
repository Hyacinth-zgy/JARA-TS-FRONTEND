import React from 'react';
import {ProjectListScreen} from './pages/project-list/index';
import {useAuth} from './context/auth-context';
export const AuthenticatedApp = () => {
  const {logout} = useAuth();
  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
      >
        退出
      </button>
      <ProjectListScreen />
    </div>
  );
};
