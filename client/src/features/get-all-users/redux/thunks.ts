import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../api/users';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => await fetchUsers()
);
