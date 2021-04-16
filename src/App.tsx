import React from 'react';
import './App.css';
// import {ProjectListScreen} from './pages/project-list';
// import {LoginScreen} from './pages/login/index';
import {useAuth} from './context/auth-context';
import {AuthenticatedApp} from './authenticated-app';
import {UnauthenticatedApp} from './pages/unauthenticated-app';
function App() {
  const {user} = useAuth();
  return (
    <div className="App">
      {/* <ProjectListScreen></ProjectListScreen> */}
      {/* <LoginScreen></LoginScreen> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
