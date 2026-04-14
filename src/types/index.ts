// ─── types/index.ts ───────────────────────────────────────────────────────────

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type ProjectStatus = 'todo' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Participant {
  id: number;
  name: string;
  role: string;
}

export interface Task {
  id: number;
  title: string;
  assigneeId: number | null;
  status: TaskStatus;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  deadline: string;
  ownerId: number | null;
  tasks: Task[];
}

export interface AppState {
  projects: Project[];
  selectedId: number | null;
  participants: Participant[];
}

export type AppAction =
  | { type: 'ADD_PROJECT';        payload: Omit<Project, 'id' | 'tasks'> }
  | { type: 'UPDATE_PROJECT';     payload: Project }
  | { type: 'DELETE_PROJECT';     payload: number }
  | { type: 'SELECT_PROJECT';     payload: number }
  | { type: 'ADD_TASK';           payload: { projectId: number; task: Omit<Task, 'id'> } }
  | { type: 'UPDATE_TASK';        payload: { projectId: number; taskId: number; status: TaskStatus } }
  | { type: 'DELETE_TASK';        payload: { projectId: number; taskId: number } }
  | { type: 'ADD_PARTICIPANT';    payload: Omit<Participant, 'id'> }
  | { type: 'UPDATE_PARTICIPANT'; payload: Participant }
  | { type: 'DELETE_PARTICIPANT'; payload: number };

export type FormErrors<T> = Partial<Record<keyof T, string>>;
