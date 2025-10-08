import { AddTaskContent } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/add-task-dialog/add-task-content";
import { Button } from "@/core/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/core/components/ui/dialog";
import { Plus } from "lucide-react";

interface AddTaskDialogProps {
  columnId: string;
}

export const AddTaskDialog = ({ columnId }: AddTaskDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="my-2 w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar tarea
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddTaskContent columnId={columnId} />
      </DialogContent>
    </Dialog>
  );
};
