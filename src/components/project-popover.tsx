import React from 'react';
import {Divider, List, Popover, Typography, Button} from 'antd';
import {useProjects} from '../utils/project';
import styled from '@emotion/styled';

export const ProjectPopover = () => {
  const {data: projects, isLoading} = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button type={'link'}>创建项目</Button>
    </ContentContainer>
  );

  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
