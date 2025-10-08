import z from "zod";

export const addColumnSchema = z.object({
  name: z.string().nonempty("El nombre de la columna es requerido"),
  description: z.string().optional(),
});

export type AddColumnFormType = z.infer<typeof addColumnSchema>;
