import { api } from '@shared';
import { TaskType } from '../model/types';

export const fetchTaskById = async (taskId: number): Promise<TaskType> =>
  await api.get(`/tasks/${taskId}`);
