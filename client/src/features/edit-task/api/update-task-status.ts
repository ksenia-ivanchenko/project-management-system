import { api } from '@shared';

export interface UpdateTaskStatusRequest {
  status: string;
}

export const updateTaskStatusApi = async (
  taskId: number,
  updatedData: UpdateTaskStatusRequest
) => {
  const response = await api.put(`/tasks/updateStatus/${taskId}`, updatedData);
  return response.data;
};
