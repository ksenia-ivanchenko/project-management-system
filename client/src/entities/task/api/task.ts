import { api } from '@shared';
import { TaskType } from '../model/types';

export const fetchTaskById = async (taskId: number): Promise<TaskType> => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data.data;
};
