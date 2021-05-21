import React, {ReactNode} from 'react';
import {AuthProvider} from './auth-context';
import {QueryClientProvider, QueryClient} from 'react-query';
import {Provider} from 'react-redux';
import {store} from '../store/index';
export const AppProviders = ({children}: {children: ReactNode}) => {
  // return <AuthProvider children={children}></AuthProvider>; children属性和在内部写children是一致的
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <AuthProvider>{children} </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
};
