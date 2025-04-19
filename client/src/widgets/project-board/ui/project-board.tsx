import { BoardSegment } from '@entities/board';
import { Status } from '@entities/task';
import { TasksList } from '@widgets/tasks-list';
import styles from './project-board.module.scss';
import { useSelector } from '@shared';

export const ProjectBoard = () => {
  const currentBoardTasks = useSelector(
    (state) => state.tasks.currentBoardTasks
  );
  const filterTasks = (status: Status) =>
    currentBoardTasks.filter((task) => task.status === status);

  return (
    <div className={styles.board}>
      {Object.values(Status).map((status) => (
        <BoardSegment key={`board-segment-${status}`} name={status}>
          <TasksList tasks={filterTasks(status)} />
        </BoardSegment>
      ))}
    </div>
  );
};
