import { AddColumnContent } from "@/app/dashboard/workspaces/[kanbanId]/components/add-column-dialog/add-column-content";
import { Button } from "@/core/components/ui/button";
import { Dialog, DialogTrigger } from "@/core/components/ui/dialog";

export const AddColumnDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar columna</Button>
      </DialogTrigger>
      <AddColumnContent />
    </Dialog>
  );
};
