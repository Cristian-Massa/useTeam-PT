import { useDeleteKanban } from "@/app/dashboard/workspaces/components/kanban-list/hooks/mutations/use-delete-kanban";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { BaseKanban } from "@/core/interfaces/kanban";
import Link from "next/link";

interface KanbanCardProps {
  kanban: BaseKanban;
}

export const KanbanCard = ({ kanban }: KanbanCardProps) => {
  const { deleteKanban, isPending } = useDeleteKanban();
  return (
    <Card className="max-w-[200px]" key={kanban._id}>
      <CardHeader>
        <CardTitle>{kanban.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{kanban.description}</p>
        <div className="flex gap-2">
          <Link href={`/dashboard/workspaces/${kanban._id}`}>
            <Button>Acceder</Button>
          </Link>
          <Button onClick={() => deleteKanban(kanban._id!)}>Borrar</Button>
        </div>
      </CardContent>
    </Card>
  );
};
