import {Project} from './interface';
import {useEffect, useCallback} from 'react';
import {cleanObject} from './helper';
import {useHttp} from './request';
import {useAsync} from './useAsync';
import {AsyncResource} from 'async_hooks';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () => client('projects', {data: cleanObject(param || {})}),
    [client, param]
  );
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, run, fetchProjects]);
  return result;
};

export const useEditProject = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: 'POST',
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
