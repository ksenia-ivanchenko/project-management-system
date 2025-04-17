enum Priority {
  'Low',
  'Medium',
  'High',
}

enum Status {
  'Backlog',
  'InProgress',
  'Done',
}

type AssigneeUserForTask = {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
};

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
