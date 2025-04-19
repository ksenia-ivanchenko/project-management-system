import { TaskType } from '@entities/task';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBoardById } from '../api/board';

export const getTasksForBoard = createAsyncThunk<
  TaskType[],
  { boardId: number; boardName: string },
  { rejectValue: string }
>(
  'boards/getTasksForBoard',
  async ({ boardId, boardName }, { rejectWithValue }) => {
    try {
      const data = await fetchBoardById(boardId);
      return data.map((task) => ({
        ...task,
        boardId,
        boardName,
      }));
    } catch (error) {
      return rejectWithValue(
        error.message || 'Не удалось загрузить задачи доски'
      );
    }
  }
);
