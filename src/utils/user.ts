import {User} from './interface';
import {useHttp} from './request';
import {useAsync} from './useAsync';
import {useEffect} from 'react';
import {cleanObject} from './helper';

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<User[]>();
  useEffect(() => {
    run(client('users', {data: cleanObject(param || {})}));
  }, [param]);
  return result;
};
