"use client";

import { useGetKanbans } from "@/app/dashboard/workspaces/components/hooks/queries/useGetKanbans";
import { KanbanCreateDialog } from "@/app/dashboard/workspaces/components/kanban-list/kanban-create-dialog";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { LoaderPulse } from "@/core/components/ui/loader";
import Link from "next/link";

export const KanbanList = () => {
  const { kanbans, isPending, refetch } = useGetKanbans();
  if (isPending) {
    <LoaderPulse />;
  }
  console.log(kanbans);
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
        kanbans.map((kanban) => (
          <Card key={kanban._id}>
            <CardHeader>
              <CardTitle>{kanban.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{kanban.description}</p>
              <Link href={`/dashboard/workspaces/${kanban._id}`}>
                <Button>Acceder</Button>
              </Link>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
