"use client";

import { useGetKanbans } from "@/app/dashboard/workspaces/components/hooks/queries/useGetKanbans";
import { KanbanCard } from "@/app/dashboard/workspaces/components/kanban-list/kanban-card";
import { KanbanCreateDialog } from "@/app/dashboard/workspaces/components/kanban-list/kanban-create-dialog";
import { Button } from "@/core/components/ui/button";

import { Loader } from "@/core/components/ui/loader";

export const KanbanList = () => {
  const { kanbans, isPending, refetch } = useGetKanbans();

  if (isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <Loader />
        <p>Cargando Kanbans</p>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <Button onClick={() => refetch()}>Refrescar</Button>
        <KanbanCreateDialog />
      </div>
      {!kanbans || kanbans.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="mb-4 text-lg">No hay kanbans disponibles.</p>
        </div>
      ) : (
        kanbans.map((kanban) => <KanbanCard key={kanban._id} kanban={kanban} />)
      )}
    </div>
  );
};
