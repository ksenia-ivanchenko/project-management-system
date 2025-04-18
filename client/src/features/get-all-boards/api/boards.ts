import { BoardType } from '@entities/board';
import { api } from '@shared';

type FetchBoardsResponse = {
  data: BoardType[];
};

export const fetchBoards = async () => {
  try {
    const response = await api.get<FetchBoardsResponse>('/boards');
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Ошибка при загрузке досок'
    );
  }
};
