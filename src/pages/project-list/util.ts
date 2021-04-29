import {useUrlQueryParam} from '../../utils/url';
export const useProjectsSearchParams = () => {
  const [param, setSearchParams] = useUrlQueryParam(['name', 'personId']);
  const projectsParam = {
    ...param,
    personId: Number(param.personId) || undefined,
  };
  return [projectsParam, setSearchParams] as const;
};
