import { Draggable } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/draggable";
import { TaskCard } from "@/app/dashboard/workspaces/[kanbanId]/components/working-area/kanban-column/tasks-of-column/task-card";
import { Task } from "@/core/interfaces/tasks";

interface TasksOfColumnProps {
  task: Task;
  columnId: string;
}

export const TasksOfColumn = ({ task, columnId }: TasksOfColumnProps) => {
  return (
    <Draggable
      draggableId={task._id}
      data={{
        type: "task",
        columnId: columnId,
      }}
    >
      <TaskCard task={task} />
    </Draggable>
  );
};
