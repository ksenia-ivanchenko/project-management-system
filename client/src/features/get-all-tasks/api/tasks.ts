import { TaskType } from '@entities/task';
import { api } from '@shared';

type FetchTasksResponse = {
  data: TaskType[];
};

export const fetchTasks = async () => {
  try {
    const response = await api.get<FetchTasksResponse>('/tasks');
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Ошибка при загрузке задач'
    );
  }
};
