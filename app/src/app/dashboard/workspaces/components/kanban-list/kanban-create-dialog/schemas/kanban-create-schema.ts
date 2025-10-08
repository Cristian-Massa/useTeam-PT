import { z } from "zod";

export const kanbanCreateSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type KanbanCreateType = z.infer<typeof kanbanCreateSchema>;
