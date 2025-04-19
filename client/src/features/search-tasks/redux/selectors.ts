import { createSelector } from '@reduxjs/toolkit';
import { TaskState } from '@shared';

const selectTasksState = (state: { tasks: TaskState }) => state.tasks;

export const selectSearchedTasks = createSelector(
  [selectTasksState],
  ({ tasks, searchQuery, selectedBoardId, selectedStatus }) => {
    return tasks.filter((task) => {
      const matchesQuery =
        !searchQuery ||
        task.title.toLowerCase().includes(searchQuery) ||
        task.assignee?.fullName.toLowerCase().includes(searchQuery);

      const matchesBoard =
        !selectedBoardId ||
        selectedBoardId.length === 0 ||
        selectedBoardId.includes(task.boardId);

      const matchesStatus =
        !selectedStatus ||
        selectedStatus.length === 0 ||
        selectedStatus.includes(task.status);

      return matchesQuery && matchesBoard && matchesStatus;
    });
  }
);
