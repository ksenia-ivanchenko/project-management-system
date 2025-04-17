import { TaskType } from '@entities/task';
import { getTasks } from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TaskState = {
  tasks: TaskType[];
  loading: boolean;
  error: string | null;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        getTasks.fulfilled,
        (state, action: PayloadAction<TaskType[]>) => {
          state.loading = false;
          state.tasks = action.payload;
          state.error = null;
        }
      )
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось загрузить доски';
      });
  },
});
