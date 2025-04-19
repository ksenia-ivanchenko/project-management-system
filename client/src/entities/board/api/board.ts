import { api } from '@shared';
import { GetTasksOnBoardResponse } from '../model/types';

export const fetchBoardById = async (
  boardId: number
): Promise<GetTasksOnBoardResponse> => {
  const response = await api.get(`/boards/${boardId}`);
  console.log(response);
  return response.data.data;
};
