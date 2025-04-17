import { useDispatch, useSelector } from '@shared';
import styles from './tasks-list.module.scss';
import { useEffect } from 'react';
import { getTasks } from '../redux/thunks';
import { TaskCard } from '@entities/task';

export const TasksList = () => {
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tasks.length) {
      dispatch(getTasks());
    }
  }, []);

  if (loading) return <div>Загрузка...</div>; // TODO: добавить скелетоны
  if (error) return <div>{error}</div>;

  return (
    <ul className={styles.ul}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
};
