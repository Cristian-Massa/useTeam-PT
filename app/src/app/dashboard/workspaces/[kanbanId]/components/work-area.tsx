"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

import { useGetMe } from "@/app/dashboard/hooks/queries/use-get-me";
import { useGetColumns } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/hooks/queries/use-get-columns";
import { KanbanColumn } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/kanban-column";
import { useSocket } from "@/app/dashboard/workspaces/[kanbanId]/contexts/socket-context";
import { WSBaseResponse } from "@/core/interfaces/base-response";
import { httpNotificationEmitter } from "@/core/lib/http-notification-observer";

export const WorkArea = () => {
  const { kanbanId } = useParams();
  const queryClient = useQueryClient();

  const { socket, handleRoom, room } = useSocket();
  const { columns, isPending } = useGetColumns();
  const { me } = useGetMe();

  const sensors = [
    useSensor(MouseSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
  ];

  useEffect(() => {
    if (!socket || !me) return;

    socket.emit("join-kanban", { kanbanId, username: me.name });

    socket.on("room-name", (data: WSBaseResponse<null>) =>
      handleRoom(data.roomName!)
    );

    const invalidateColumns = () =>
      queryClient.invalidateQueries({ queryKey: ["columns"] });
    const invalidateTasks = () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

    socket.on("revalidate-columns", invalidateColumns);
    socket.on("revalidate-tasks", invalidateTasks);
    socket.on("real-time-message", (data: WSBaseResponse<null>) => {
      httpNotificationEmitter.emitNotifcation(data.message!);
    });

    return () => {
      socket.off("room-name");
      socket.off("columns-position-updated");
      socket.off("response-create-column");
      socket.off("real-time-message");
    };
  }, [socket, me, kanbanId, queryClient, handleRoom]);

  // Manejo del drag & drop
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id || !columns) return;
    const activeType = active.data.current?.type;
    const endType = active.data.current?.type;
    if (activeType === "column" && endType === "column") {
      const oldIndex = columns.findIndex((col) => col._id === active.id);
      const newIndex = columns.findIndex((col) => col._id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const newColumns = [...columns];
      const [movedColumn] = newColumns.splice(oldIndex, 1);
      newColumns.splice(newIndex, 0, movedColumn);

      queryClient.setQueryData(["columns"], newColumns);
      socket?.emit("update-columns-position", {
        data: {
          firstColumnId: columns[oldIndex]._id,
          secondColumnId: columns[newIndex]._id,
        },
        roomName: room,
      });
    }
    if (activeType === "task" && endType === "task") {
      console.log(activeType, endType);
      const startColumnId = active.data.current?.columnId;
      const overColumnId = over.data.current?.columnId;
      console.log(overColumnId);
      if (startColumnId === overColumnId) return;
      const taskId = active.id;
      console.log(overColumnId);
      socket?.emit("change-column-task", {
        data: {
          taskId,
          overColumnId,
        },
        roomName: room,
      });
    }
  };

  if (isPending) return <div>Cargando columnas...</div>;

  return (
    <div className="h-full flex gap-6 overflow-x-auto pb-6">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        {columns
          ?.sort((a, b) => a.position - b.position)
          .map((column) => (
            <KanbanColumn key={column._id} column={column} />
          ))}
      </DndContext>
    </div>
  );
};
