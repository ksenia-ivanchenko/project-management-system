import { TaskType } from '@entities/task';
import { api } from '@shared';

type fetchTasksResponse = {
  data: TaskType[];
};

export const fetchTasks = async () => {
  try {
    const response = await api.get<fetchTasksResponse>('/tasks');
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Ошибка при загрузке задач'
    );
  }
};
