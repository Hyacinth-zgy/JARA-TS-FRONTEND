import React, {ReactNode} from 'react';
import {AuthProvider} from './auth-context';
export const AppProviders = ({children}: {children: ReactNode}) => {
  // return <AuthProvider children={children}></AuthProvider>; children属性和在内部写children是一致的
  return <AuthProvider>{children} </AuthProvider>;
};
