import { Priority, Status } from '@entities/task';
import { api } from '@shared';

export type UpdateTaskRequest = {
  assigneeId?: number;
  description?: string;
  priority?: Priority;
  status?: Status;
  title?: string;
};

type UpdateTaskResponse = {
  message: string;
};

type ErrorResponse = {
  error: string;
  message: string;
};

export const editTaskApi = async (
  taskId: number,
  updatedData: UpdateTaskRequest
) => {
  try {
    await api.put<UpdateTaskResponse>(`/tasks/update/${taskId}`, updatedData);
  } catch (error) {
    if (error.response) {
      const status = error.response?.status;
      const responseData = error.response.data as ErrorResponse;

      if (status === 400 || status === 404 || status === 500) {
        throw new Error(responseData.message);
      }
    }

    throw new Error('Ошибка при обновлении задачи');
  }
};
