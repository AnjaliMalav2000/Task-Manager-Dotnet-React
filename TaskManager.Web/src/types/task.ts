export interface TaskItem {
  id: string; // GUID from C# is represented as string in JS/TS
  description: string;
  isCompleted: boolean;
}

export type TaskFilter = 'all' | 'completed' | 'active';
