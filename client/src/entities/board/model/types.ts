import { Priority, Status } from '@entities/task';
import { AssigneeUserForTask } from '@entities/user';

export type BoardType = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

export type GetTasksOnBoardResponse = {
  assignee: AssigneeUserForTask;
  description: string;
  id: number;
  priority: Priority;
  status: Status;
  title: string;
}[];
