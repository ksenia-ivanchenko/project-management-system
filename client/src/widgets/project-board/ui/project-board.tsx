import { BoardSegment } from '@entities/board';
import { Status, TaskType } from '@entities/task';
import { TasksList } from '@widgets/tasks-list';
import styles from './project-board.module.scss';
import { CreateNewTask } from '@features/create-new-task';

type ProjectBoardProps = {
  boardTasks: TaskType[];
};

export const ProjectBoard = ({ boardTasks }: ProjectBoardProps) => {
  const filterTasks = (status: Status) =>
    boardTasks.filter((task) => task.status === status);

  return (
    <div className={styles.board}>
      {Object.values(Status).map((status) => (
        <BoardSegment key={`board-segment-${status}`} name={status}>
          <TasksList tasks={filterTasks(status)} />
          <CreateNewTask />
        </BoardSegment>
      ))}
    </div>
  );
};
