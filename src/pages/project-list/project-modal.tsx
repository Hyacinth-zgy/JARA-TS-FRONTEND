import React from 'react';
import {Drawer, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {projectListActons, selectProjectModalOpen} from './project-list.slice';

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  console.log(projectModalOpen);

  return (
    <Drawer
      onClose={() => {
        dispatch(projectListActons.closeProjectModal());
      }}
      visible={projectModalOpen}
      width={'100%'}
    >
      <h1>Project Modal</h1>
      <Button
        onClick={() => {
          dispatch(projectListActons.closeProjectModal());
        }}
      >
        关闭
      </Button>
    </Drawer>
  );
};
