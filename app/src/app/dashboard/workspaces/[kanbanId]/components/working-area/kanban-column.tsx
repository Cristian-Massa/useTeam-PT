import { AddTaskDialog } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/add-task-dialog";
import { Draggable } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/draggable";
import { Droppable } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/droppable";
import { useGetTasks } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/hooks/queries/use-get-tasks";
import { TasksOfColumn } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/kanban-column/tasks-of-column";
import { useSocket } from "@/app/dashboard/workspaces/[kanbanId]/contexts/socket-context";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Column } from "@/core/interfaces/columns";
import { Trash } from "lucide-react";

interface KanbanColumnProps {
  column: Column;
}

export const KanbanColumn = ({ column }: KanbanColumnProps) => {
  const { socket, room } = useSocket();
  const { tasks, isPending } = useGetTasks(column._id);
  const handleClick = () => {
    if (!socket) return;
    socket.emit("delete-column", { id: column._id, roomName: room });
  };
  return (
    <Droppable
      type="column"
      className="h-full flex gap-6 p-6"
      columnId={column._id}
      key={column._id}
    >
      <Draggable
        draggableId={column._id}
        data={{ type: "column" }}
        className="p-2 bg-background"
      >
        <div className="flex-shrink-0 w-80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-base">{column.name}</h2>
              <Badge variant="secondary" className="rounded-full">
                {column.tasks.length}
              </Badge>
            </div>
            <Button
              onClick={handleClick}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <AddTaskDialog columnId={column._id} />
        </div>
        <Droppable type="task" key={column._id} columnId={column._id}>
          <div className="space-y-3">
            {tasks &&
              tasks.map((task) => (
                <TasksOfColumn
                  key={task._id}
                  columnId={column._id}
                  task={task}
                />
              ))}
          </div>
        </Droppable>
      </Draggable>
    </Droppable>
  );
};
