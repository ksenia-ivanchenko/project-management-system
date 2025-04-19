import { Priority, Status } from '@entities/task';
import { AssigneeUserForTask } from '@entities/user';
import { api } from '@shared';

type GetTasksOnBoardResponse = {
  assignee: AssigneeUserForTask;
  description: string;
  id: number;
  priority: Priority;
  status: Status;
  title: string;
}[];

export const fetchBoardById = async (
  boardId: number
): Promise<GetTasksOnBoardResponse> => {
  const response = await api.get(`/boards/${boardId}`);
  return response.data.data;
};
