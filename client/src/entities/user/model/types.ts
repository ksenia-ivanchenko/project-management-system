export type User = {
  avatarUrl: string;
  description: string;
  email: string;
  fullName: string;
  id: number;
  tasksCount: number;
  teamId: number;
  teamName: string;
};

export type AssigneeUserForTask = {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
};
