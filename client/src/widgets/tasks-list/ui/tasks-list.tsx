import styles from './tasks-list.module.scss';
import { TaskCard, TaskType } from '@entities/task';
import { useTasks } from '@features/get-all-tasks';
import { DragEvent, useState } from 'react';
import { EditTask } from '@features/edit-task';
import { Loader } from '@shared';

type TasksListProps = {
  tasks: TaskType[];
  showGoToBoardModalButton?: boolean;
  onDragStart: (task: TaskType) => void;
};

export const TasksList = ({
  tasks,
  showGoToBoardModalButton,
  onDragStart,
}: TasksListProps) => {
  const { loading, error } = useTasks();

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType>(null);

  const handleСardClick = (task: TaskType) => {
    setTaskFormOpen(true);
    setCurrentTask(task);
  };
  const handleClose = () => setTaskFormOpen(false);

  const handleDragStart = (e: DragEvent<HTMLLIElement>, task: TaskType) => {
    e.dataTransfer.setData('text/plain', String(task.id));
    onDragStart(task);
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e: DragEvent<HTMLLIElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  if (loading) {
    return <Loader />;
  }

  if (error) return <>{error}</>;
  if (!tasks.length) return <>Кажется, тут пусто</>;

  return (
    <div>
      <ul className={styles.ul}>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => handleСardClick(task)}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            onDragEnd={handleDragEnd}
          >
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
