import {configureStore} from '@reduxjs/toolkit';
import {projectListSlice} from '../pages/project-list/project-list.slice';
import {authSlice} from './auth.slice';
export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
});

// ReturnType 可以拿到一个函数的返回值类型
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;