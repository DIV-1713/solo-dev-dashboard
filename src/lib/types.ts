
export type ProjectStatus = 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'archived';

export type ProjectStatusInfo = {
  value: ProjectStatus;
  label: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string | null;
};

export type Technology = {
  id: string;
  name: string;
  color?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  githubUrl?: string;
  deploymentUrl?: string;
  technologies: Technology[];
  tasks: Task[];
};
