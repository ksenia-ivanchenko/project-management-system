import { User } from '@entities/user';
import { api } from '@shared';

type FetchUsersResponse = { data: User[] };

type ErrorResponse = {
  error: string;
  message: string;
};

export const fetchUsers = async () => {
  try {
    const response = await api.get<FetchUsersResponse>('/users');
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data as ErrorResponse;

      if (status === 500) {
        throw new Error(responseData.message);
      }
    }

    throw new Error('Ошибка при создании задачи');
  }
};
