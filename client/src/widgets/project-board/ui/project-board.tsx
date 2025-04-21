import { BoardSegment } from '@entities/board';
import { Status, TaskType } from '@entities/task';
import { TasksList } from '@widgets/tasks-list';
import styles from './project-board.module.scss';
import { useDispatch, useSelector } from '@shared';
import { useState, DragEvent } from 'react';
import { updateTaskStatus } from '@features/edit-task';

export const ProjectBoard = () => {
  const dispatch = useDispatch();
  const currentBoardTasks = useSelector(
    (state) => state.tasks.currentBoardTasks
  );
  const [draggedTask, setDraggedTask] = useState<TaskType>(null);
  const [draggedOverStatus, setDraggedOverStatus] = useState<Status | null>(
    null
  );

  const filterTasks = (status: Status) =>
    currentBoardTasks.filter((task) => task.status === status);

  const handleDragStart = (task: TaskType) => {
    setDraggedTask(task);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault();
    setDraggedOverStatus(status);
  };
  const handleDragLeave = () => {
    setDraggedOverStatus(null);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>, newStatus: Status) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      dispatch(
        updateTaskStatus({
          taskId: draggedTask.id,
          updatedData: { status: newStatus },
          boardId: draggedTask.boardId,
        })
      );
    }
    setDraggedTask(null);
    setDraggedOverStatus(null);
  };

  return (
    <div className={styles.board}>
      {Object.values(Status).map((status) => (
        <div
          key={`board-segment-${status}`}
          onDragOver={(e) => handleDragOver(e, status)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, status)}
          data-dragover={draggedOverStatus === status}
          className={styles.column}
        >
          <BoardSegment name={status}>
            <TasksList
              tasks={filterTasks(status)}
              onDragStart={handleDragStart}
            />
          </BoardSegment>
        </div>
      ))}
    </div>
  );
};
