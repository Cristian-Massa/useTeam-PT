import { Task } from "@/core/interfaces/tasks";

export interface Column {
  _id: string; // ID generado por Mongo
  name: string;
  description?: string;
  tasks: Task[];
  position: number;
  createdAt: string; // timestamps de Mongoose
  updatedAt: string;
}
