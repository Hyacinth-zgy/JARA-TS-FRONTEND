import {useState, useCallback, useReducer} from 'react';
import {stat} from 'fs';

export const useUndo = <T>(initialPresent: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialPresent);
  const [future, setFuture] = useState<T[]>([]);
  const canUndo = past.length !== 0;
  const canRedo = future.length !== 0;

  const undo = useCallback(() => {
    if (!canUndo) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  }, [canUndo, future, past, present]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [canRedo, future, past, present]);

  const set = useCallback(
    (newPresent: T) => {
      if (newPresent === present) return;
      setPast([...past, present]);
      setPresent(newPresent);
      setFuture([]);
    },
    [past, present]
  );

  const reset = useCallback((newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFuture([]);
  }, []);

  return [
    {past, present, future},
    {set, reset, undo, redo, canUndo, canRedo},
  ];
};

// 对于同一个HOOK中有好几个状态，但是这些状态又是相互影响的，这种情况我们应该把这几个状态合并在一起，这样做可以大大降低写HOOK的复杂程度
// 改写useUndo，使用HOOK合并的方式

export const useUndoHooksMerge = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => {
    setState((currentState) => {
      const {past, present, future} = currentState;
      if (past.length === 0) {
        return currentState;
      }
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        future: [present, ...future],
        present: previous,
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const {past, present, future} = currentState;
      if (future.length === 0) return currentState;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const {past, present} = currentState;
      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState((currentState) => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [state, {set, reset, undo, redo, canUndo, canRedo}];
};

// 使用useReducer对上面状态的合并进行改进，useReducer就是针对多状态互相依赖而生的
const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';
type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const {past, present, future} = state;
  const {type, newPresent} = action;
  switch (action.type) {
    case UNDO: {
      if (past.length === 0) {
        return state;
      }
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        future: [present, ...future],
        present: previous,
      };
    }
    case REDO: {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case SET: {
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
  return state;
};

export const useUndoHooksMergeUseReducer = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => {
    dispatch({type: UNDO});
  }, []);
  const redo = useCallback(() => {
    dispatch({type: REDO});
  }, []);
  const set = useCallback((newPresent: T) => {
    dispatch({type: SET, newPresent});
  }, []);
  const reset = useCallback((newPresent: T) => {
    dispatch({type: RESET, newPresent});
  }, []);
  return [state, {set, reset, undo, redo, canUndo, canRedo}] as const;
};
