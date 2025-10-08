import { z } from "zod";
export const addTaskSchema = z.object({
  name: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  assignedTo: z.string().min(1, "Debe seleccionar a alguien"),
  priority: z.enum(["high", "medium", "low"], "Debe seleccionar una prioridad"),
});

export type AddTaskFormType = z.infer<typeof addTaskSchema>;
