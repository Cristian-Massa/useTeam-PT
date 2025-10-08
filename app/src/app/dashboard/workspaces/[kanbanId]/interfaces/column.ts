import { Task } from "@/app/dashboard/workspaces/[kanbanId]/interfaces/task";

export interface Column {
  _id: string;
  title: string;
  tasks: Task[];
}
