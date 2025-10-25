export enum Priority {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number; // Store as timestamp for sorting
}

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed'
}

export enum SortOrder {
    CreationDate = 'creation-date',
    Priority = 'priority',
    Status = 'status',
}
