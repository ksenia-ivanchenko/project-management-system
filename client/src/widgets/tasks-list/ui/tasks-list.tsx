import styles from './tasks-list.module.scss';
import { TaskCard, TaskType } from '@entities/task';
import { useTasks } from '@features/get-all-tasks';
import { useState } from 'react';
import { EditTask } from '@features/edit-task';

type TasksListProps = {
  tasks: TaskType[];
  showGoToBoardModalButton?: boolean;
};

export const TasksList = ({
  tasks,
  showGoToBoardModalButton,
}: TasksListProps) => {
  const { loading, error } = useTasks();

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType>(null);

  const handleСardClick = (task: TaskType) => {
    setTaskFormOpen(true);
    setCurrentTask(task);
  };
  const handleClose = () => setTaskFormOpen(false);

  if (loading) return <>Загрузка...</>; // TODO: добавить скелетоны
  if (error) return <>{error}</>;
  if (!tasks.length) return <>Кажется, тут пусто</>;

  return (
    <div>
      <ul className={styles.ul}>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => handleСardClick(task)}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
      <EditTask
        showGoToBoardModalButton={showGoToBoardModalButton}
        taskFormOpen={taskFormOpen}
        currentTask={currentTask}
        handleClose={handleClose}
      />
    </div>
  );
};
