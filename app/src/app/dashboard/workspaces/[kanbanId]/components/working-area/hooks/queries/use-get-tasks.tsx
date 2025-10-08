import { Task } from "@/core/interfaces/tasks";
import { api } from "@/core/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = (columnId: string) => {
  const { data: tasks, isPending } = useQuery({
    queryKey: ["tasks", columnId],
    queryFn: async () => {
      const response = await api<Task[]>(`/tasks/${columnId}`, {
        method: "GET",
      });

      return response?.data ?? [];
    },
  });

  return { tasks, isPending };
};
