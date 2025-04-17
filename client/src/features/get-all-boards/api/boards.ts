import { BoardType } from '@entities/board';
import { api } from '@shared';

type fetchBoardsResponse = {
  data: BoardType[];
};

export const fetchBoards = async () => {
  try {
    const response = await api.get<fetchBoardsResponse>('/boards');
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Ошибка при загрузке досок'
    );
  }
};
