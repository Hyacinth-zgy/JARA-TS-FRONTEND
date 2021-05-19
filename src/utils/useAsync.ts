import {useState} from 'react';
import {Button} from 'antd';
import {useMountedRef} from './helper';
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

// 用来处理异步函数请求的Async
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = {...defaultConfig, ...initialConfig};
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  // 具体useState返回函数看笔记
  const [retry, serRetry] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: 'error',
      data: null,
    });

  // 用来触发异步请求
  const run = (promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
    if (!promise || !promise.then) {
      throw new Error('请传入一个Promise的数据');
    }
    serRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    setState({...state, stat: 'loading'});
    return promise
      .then((data) => {
        if (mountedRef.current) setData(data);
        return data;
      })
      .catch((err) => {
        // catch会消化异常，如果不主动抛出异常
        setError(err);
        if (config.throwOnError) {
          return Promise.reject(err);
        }
        return err;
      });
  };
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // 当retry被调用的时候更重新调用run方法，让state刷新一遍
    retry,
    ...state,
  };
};
