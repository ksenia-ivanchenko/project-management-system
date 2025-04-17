import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBoards } from '../api/boards';

export const getBoards = createAsyncThunk(
  'boards/getBoards',
  async () => await fetchBoards()
);
