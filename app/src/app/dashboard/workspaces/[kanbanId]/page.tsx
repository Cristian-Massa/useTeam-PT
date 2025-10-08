"use client";
import { AddColumnDialog } from "@/app/dashboard/workspaces/[kanbanId]/components/add-column-dialog";
import { WorkArea } from "@/app/dashboard/workspaces/[kanbanId]/components/work-area";
import { SocketProvider } from "@/app/dashboard/workspaces/[kanbanId]/contexts/socket-context";
import { Button } from "@/core/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const KanbanPage = () => {
  const exportTasks = async () => {
    toast("Exportando tareas...");
    try {
      const response = await fetch(
        "http://localhost:5678/webhook-test/50484cb5-a38d-4058-ad6e-7bac1c01a82b",
        {
          method: "POST",
        }
      );

      const result = await response.json();

      toast("Las tareas fueron enviadas al email seleccionado en n8n");
    } catch (error) {
      toast("Hubo un error al exportar las tareas");
    }
  };
  return (
    <>
      <SocketProvider>
        <div className="flex gap-2">
          <AddColumnDialog />
          <Button onClick={exportTasks}>Exportar tareas</Button>
        </div>
        <WorkArea />
      </SocketProvider>
    </>
  );
};

export default KanbanPage;
