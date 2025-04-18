import { CreateTaskRequest } from '@entities/task';
import { api } from '@shared';

type CreateTaskSuccessResponse = {
  data: {
    id: number;
  };
};

type ErrorResponse = {
  error: string;
  message: string;
};

export const createTask = async (data: CreateTaskRequest) => {
  try {
    const response = await api.post<CreateTaskSuccessResponse>(
      '/tasks/create',
      data
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data as ErrorResponse;

      if (status === 400 || status === 404 || status === 500) {
        throw new Error(responseData.message);
      }
    }

    throw new Error('Ошибка при создании задачи');
  }
};
