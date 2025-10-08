"use client";
import {
  AddColumnFormType,
  addColumnSchema,
} from "@/app/dashboard/workspaces/[kanbanId]/components/add-column-dialog/schema/add-column-schema";
import { useSocket } from "@/app/dashboard/workspaces/[kanbanId]/contexts/socket-context";
import { Button } from "@/core/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { ValidationException } from "@/core/exceptions/validation-exception";
import { WSBaseResponse } from "@/core/interfaces/base-response";
import { getValidationError } from "@/core/lib/get-validation-error";
import { validationErrorEmitter } from "@/core/lib/validation-error-observer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

export const AddColumnContent = () => {
  const { socket, room } = useSocket();
  const { kanbanId } = useParams();

  const { control, handleSubmit } = useForm<AddColumnFormType>({
    resolver: zodResolver(addColumnSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(
    (data: AddColumnFormType) => {
      if (socket && room) {
        const payload: WSBaseResponse<object> = {
          data: { ...data, kanban: kanbanId },
          roomName: room,
        };
        socket.emit("createColumn", payload);
      }
    },
    (errors) => {
      const error = getValidationError(errors);
      validationErrorEmitter.emit(new ValidationException(error));
    }
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Agregar columna</DialogTitle>
      </DialogHeader>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Nombre de columna</Label>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} placeholder="Nombre de columna" />
                </>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Descripción</Label>
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} placeholder="Descripción" />
                </>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Agregar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
