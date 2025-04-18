import styles from './tasks-list.module.scss';
import { TaskCard, TaskType } from '@entities/task';
import { CreateNewTaskButton } from '@features/create-new-task';
import { useTasks } from '@features/get-all-tasks';
import { useState } from 'react';
import { EditTaskModal } from '@features/edit-task';

export const TasksList = () => {
  const { tasks, loading, error } = useTasks();

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType>(null);

  const handleСardClick = (task: TaskType) => {
    setTaskFormOpen(true);
    setCurrentTask(task);
  };
  const handleClose = () => setTaskFormOpen(false);

  if (loading) return <div>Загрузка...</div>; // TODO: добавить скелетоны
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => handleСardClick(task)}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
      <div className={styles.button}>
        <CreateNewTaskButton />
      </div>
      <EditTaskModal
        taskFormOpen={taskFormOpen}
        currentTask={currentTask}
        handleClose={handleClose}
      />
    </div>
  );
};
