import React from 'react';
import './App.css';
// import {ProjectListScreen} from './pages/project-list';
// import {LoginScreen} from './pages/login/index';
import {useAuth} from './context/auth-context';
import {AuthenticatedApp} from './authenticated-app';
import {UnauthenticatedApp} from './pages/unauthenticated-app';
import {ErrorBoundary} from './components/error-boundary';
import {FullPageErrorFallback} from './components/libs';
function App() {
  const {user} = useAuth();
  return (
    <div className="App">
      {/* <ProjectListScreen></ProjectListScreen> */}
      {/* <LoginScreen></LoginScreen> */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {/* 这里抛出错误的话会被ErrorBoundary捕捉 */}
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
