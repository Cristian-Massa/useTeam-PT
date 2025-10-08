"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/core/components/ui/button";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import {
  AddTaskFormType,
  addTaskSchema,
} from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/add-task-dialog/schema/add-task-schema";
import { useSocket } from "@/app/dashboard/workspaces/[kanbanId]/contexts/socket-context";
import { getValidationError } from "@/core/lib/get-validation-error";
import { validationErrorEmitter } from "@/core/lib/validation-error-observer";
import { ValidationException } from "@/core/exceptions/validation-exception";

interface AddTaskContentProps {
  columnId: string;
}

export const AddTaskContent = ({ columnId }: AddTaskContentProps) => {
  const { socket, room } = useSocket();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskFormType>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      assignedTo: "",
      priority: "medium",
    },
  });
  const onSubmit = handleSubmit(
    (formData) => {
      if (!socket) return;
      const data = { ...formData, column: columnId };
      socket.emit("create-task", {
        data,
        roomName: room,
      });
    },
    (errors) => {
      const error = getValidationError(errors);
      validationErrorEmitter.emit(new ValidationException(error));
    }
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle>Agregar nueva tarea</DialogTitle>
      </DialogHeader>

      <form className="grid gap-4 py-4" onSubmit={onSubmit}>
        <div className="min-w-sm grid justify-self-center">
          {/* Título */}
          <Label className="mb-2">Titulo de la tarea</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ej. Diseñar la nueva landing page"
              />
            )}
          />

          {/* Descripción */}
          <Label className="mt-4 mb-2">Descripción</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ej. Crear un diseño moderno y atractivo para la nueva landing page del producto."
              />
            )}
          />

          {/* Asignar a */}
          <Label className="mt-4 mb-2">Asignar a</Label>
          <Controller
            name="assignedTo"
            control={control}
            render={({ field }) => <Input placeholder="Ej. Jorge" {...field} />}
          />

          {/* Prioridad */}
          <Label className="mt-4 mb-2">Prioridad</Label>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Prioridad</SelectLabel>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancelar</Button>
          </DialogClose>
          <Button type="submit">Agregar</Button>
        </DialogFooter>
      </form>
    </>
  );
};
