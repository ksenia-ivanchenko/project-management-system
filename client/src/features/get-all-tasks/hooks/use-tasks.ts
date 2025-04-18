import { useDispatch, useSelector } from '@shared';
import { useEffect } from 'react';
import { getTasks } from '../redux/thunks';

export const useTasks = () => {
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tasks.length) {
      dispatch(getTasks());
    }
  }, []);

  return { tasks, loading, error };
};
