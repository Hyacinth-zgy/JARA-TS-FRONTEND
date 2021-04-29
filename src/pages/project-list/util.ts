import {useUrlQueryParam} from '../../utils/url';
import {useMemo} from 'react';
export const useProjectsSearchParams = () => {
  const [param, setSearchParams] = useUrlQueryParam(['name', 'personId']);
  const projectsParam = {
    ...param,
    personId: Number(param.personId) || undefined,
  };

  return [
    useMemo(() => {
      return projectsParam;
    }, [param]),
    setSearchParams,
  ] as const;
};
