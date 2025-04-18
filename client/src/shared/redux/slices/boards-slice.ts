import { BoardType } from '@entities/board';
import { getBoards } from '@features/get-all-boards';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BoardState = {
  boards: BoardType[];
  loading: boolean;
  error: string | null;
};

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        getBoards.fulfilled,
        (state, action: PayloadAction<BoardType[]>) => {
          state.loading = false;
          state.boards = action.payload;
          state.error = null;
        }
      )
      .addCase(getBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось загрузить доски';
      });
  },
});
