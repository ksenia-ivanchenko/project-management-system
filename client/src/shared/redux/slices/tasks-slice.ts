import { TaskType } from '@entities/task';
import { createNewTask } from '@features/create-new-task';
import { editTask } from '@features/edit-task';
import { getTasks } from '@features/get-all-tasks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TaskState = {
  tasks: TaskType[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload.toLowerCase().trim();
    },
  },
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
    builder
      .addCase(
        createNewTask.fulfilled,
        (state, action: PayloadAction<TaskType>) => {
          state.tasks.push(action.payload);
          state.error = null;
        }
      )
      .addCase(createNewTask.rejected, (state, action) => {
        state.error = action.payload || 'Не удалось создать задачу';
      });
    builder
      .addCase(editTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.error = action.payload || 'Не удалось обновить задачу';
      });
  },
});

export const selectTaskById = (state: { tasks: TaskState }, taskId: number) =>
  state.tasks.tasks.find((task) => task.id === taskId);

export const selectSearchedTasks = (state: { tasks: TaskState }) => {
  const { tasks, searchQuery } = state.tasks;
  if (!searchQuery) return tasks;

  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery) ||
      task.assignee?.fullName.toLowerCase().includes(searchQuery)
  );
};

export const { setSearchQuery } = tasksSlice.actions;
