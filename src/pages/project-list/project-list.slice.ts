import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: 'projectListSlice', // 只是标识切片本身，对数据驱动用处不大 projectListSlice
  initialState,
  reducers: {
    // 这里看起来违反了redux需要返回一个新得对象的原理，但是其实是redux-tookit底层用了immer做了封装
    // 所以这里直接更改原始状态就行了
    openProjectModal(state) {
      console.log(1);
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

// 类似于redux中action，但是因为redux-tookit底层做了封装，所以action的类型变成了一个个的函数
export const projectListActons = projectListSlice.actions;
console.log(projectListActons);
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
console.log(selectProjectModalOpen);
