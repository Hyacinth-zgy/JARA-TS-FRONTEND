import {Project} from './interface';
import {useEffect} from 'react';
import {cleanObject} from './helper';
import {useHttp} from './request';
import {useAsync} from './useAsync';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();
  useEffect(() => {
    run(client('projects', {data: cleanObject(param || {})}));
  }, [param]);
  return result;
};
