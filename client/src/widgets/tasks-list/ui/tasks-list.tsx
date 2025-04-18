import styles from './tasks-list.module.scss';
import { TaskCard } from '@entities/task';
import { CreateNewTaskButton } from '@features/create-new-task';
import { useTasks } from '@features/get-all-tasks';

export const TasksList = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) return <div>Загрузка...</div>; // TODO: добавить скелетоны
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
      <div className={styles.button}>
        <CreateNewTaskButton />
      </div>
    </div>
  );
};
