import { fetchTaskById, TaskType } from '@entities/task';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { editTaskApi, UpdateTaskRequest } from '../api/edit-task';
import {
  updateTaskStatusApi,
  UpdateTaskStatusRequest,
} from '../api/update-task-status';

type EditTaskParams = {
  taskId: number;
  updatedData: UpdateTaskRequest;
  boardId: number;
};

type UpdateTaskStatusParams = {
  taskId: number;
  updatedData: UpdateTaskStatusRequest;
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

export const updateTaskStatus = createAsyncThunk<
  TaskType,
  UpdateTaskStatusParams,
  { rejectValue: string }
>(
  'tasks/updateStatus',
  async ({ taskId, updatedData, boardId }, { rejectWithValue }) => {
    try {
      await updateTaskStatusApi(taskId, updatedData);
      const task = await fetchTaskById(taskId);
      return { ...task, boardId };
    } catch (error) {
      return rejectWithValue(
        error.message || 'Не удалось обновить статус задачи'
      );
    }
  }
);
