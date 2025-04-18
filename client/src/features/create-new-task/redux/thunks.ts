import { createAsyncThunk } from '@reduxjs/toolkit';
import { createTask } from '../api/create-new-task';
import { CreateTaskRequest, fetchTaskById, TaskType } from '@entities/task';

export const createNewTask = createAsyncThunk<
  TaskType,
  CreateTaskRequest,
  { rejectValue: string }
>('task/create', async (taskData, { rejectWithValue }) => {
  try {
    const { data } = await createTask(taskData);
    const task = await fetchTaskById(data.id);
    return task;
  } catch (error) {
    return rejectWithValue(error.message || 'Не удалось создать задачу');
  }
});
