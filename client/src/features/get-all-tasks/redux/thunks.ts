import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks } from '../api/tasks';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async () => await fetchTasks()
);
