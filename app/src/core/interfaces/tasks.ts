export interface Task {
  _id: string;
  name: string;
  description?: string;
  comments: string[];
  priority?: string;
  column: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}
