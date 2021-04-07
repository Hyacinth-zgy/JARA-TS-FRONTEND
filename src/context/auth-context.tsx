import React, {useState, ReactNode} from 'react';
import {AuthForm, User} from '../utils/interface';
import * as AUTH from '../auth-provider';
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) =>
    AUTH.login(form).then((user) => {
      setUser(user);
    });
  const register = (form: AuthForm) =>
    AUTH.register(form).then((user) => {
      setUser(user);
    });
  const logout = () =>
    AUTH.logout().then(() => {
      setUser(null);
    });
  return (
    <AuthContext.Provider
      children={children}
      value={{user, login, register, logout}}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用');
  }
  return context;
};
