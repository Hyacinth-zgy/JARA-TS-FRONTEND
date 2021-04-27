import React, {useState, ReactNode} from 'react';
import {FullPageLoading, FullPageErrorFallback} from '../components/libs';
import {AuthForm, User} from '../utils/interface';
import * as AUTH from '../auth-provider';
import {useMount} from '../utils/helper';
import {http} from '../utils/request';
import {useAsync} from '../utils/useAsync';
const bootstrapUser = async () => {
  let user = null;
  const token = AUTH.getToken();
  if (token) {
    const data = await http('me', {token});
    user = data.user;
  }
  return user;
};
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
  // 原来: const [user, setUser] = useState<User | null>(null);
  // 改造:
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
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
  useMount(() => {
    // 初始化时获取user信息
    // 原:  bootstrapUser().then(setUser);
    // 改造:
    run(bootstrapUser());
  });

  // 如果正在获取信息
  if (isIdle || isLoading) {
    return FullPageLoading();
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{user, login, register, logout}}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  // console.log(context);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用');
  }
  return context;
};
