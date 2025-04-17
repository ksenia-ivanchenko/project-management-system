import { BoardType } from '@entities/board';
import { api } from '@shared';

export const fetchBoards = async () => {
  try {
    const response = await api.get<{ data: BoardType[] }>('/boards');
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Ошибка при загрузке досок'
    );
  }
};
