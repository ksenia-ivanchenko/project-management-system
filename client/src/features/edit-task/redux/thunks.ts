import { fetchTaskById, TaskType } from '@entities/task';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { editTaskApi, UpdateTaskRequest } from '../api/edit-task';

type EditTaskParams = {
  taskId: number;
  updatedData: UpdateTaskRequest;
  boardId: number;
};

export const editTask = createAsyncThunk<
  TaskType,
  EditTaskParams,
  { rejectValue: string }
>(
  'task/edit',
  async ({ taskId, updatedData, boardId }, { rejectWithValue }) => {
    try {
      await editTaskApi(taskId, updatedData);
      const task = await fetchTaskById(taskId);
      return { ...task, boardId };
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось обновить задачу');
    }
  }
);
