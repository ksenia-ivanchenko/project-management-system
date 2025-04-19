import { AssigneeUserForTask } from '@entities/user';

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum Status {
  BACKLOG = 'Backlog',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
}

export type TaskType = {
  assignee: AssigneeUserForTask;
  boardId: number;
  boardName: string;
  description: string;
  id: number;
  priority: Priority;
  status: Status;
  title: string;
};

export type CreateTaskRequest = {
  assigneeId: number;
  boardId: number;
  description: string;
  priority?: Priority;
  title: string;
};
