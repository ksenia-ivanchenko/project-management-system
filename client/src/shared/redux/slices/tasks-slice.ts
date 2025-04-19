import { TaskType } from '@entities/task';
import { createNewTask } from '@features/create-new-task';
import { editTask } from '@features/edit-task';
import { getTasks } from '@features/get-all-tasks';
import { getTasksForBoard } from '@pages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TaskState = {
  tasks: TaskType[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedBoardId: number[] | null;
  selectedStatus: string[] | null;
  currentBoardTasks: TaskType[];
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedBoardId: null,
  selectedStatus: null,
  currentBoardTasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload.toLowerCase().trim();
    },
    setBoardFilter: (state, action: PayloadAction<number[] | null>) => {
      state.selectedBoardId = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string[] | null>) => {
      state.selectedStatus = action.payload;
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
          if (action.payload.boardId === state.currentBoardTasks[0].boardId) {
            state.currentBoardTasks.push(action.payload);
          }
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
        const indexForCurrentBoard = state.currentBoardTasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (indexForCurrentBoard !== -1) {
          state.currentBoardTasks[indexForCurrentBoard] = action.payload;
        }
        state.error = null;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.error = action.payload || 'Не удалось обновить задачу';
      });
    builder
      .addCase(getTasksForBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentBoardTasks = [];
      })
      .addCase(getTasksForBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoardTasks = action.payload;
      })
      .addCase(getTasksForBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Не удалось загрузить задачи';
      });
  },
});

export const selectTaskById =
  (taskId: number) =>
  (state: { tasks: TaskState }): TaskType | undefined =>
    state.tasks.tasks.find((task) => task.id === taskId);

export const { setSearchQuery, setBoardFilter, setStatusFilter } =
  tasksSlice.actions;
