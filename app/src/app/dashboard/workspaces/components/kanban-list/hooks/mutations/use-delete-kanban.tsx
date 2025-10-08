import { api } from "@/core/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteKanban = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteKanban, isPending } = useMutation({
    mutationFn: async (kanbanId: string) => {
      const response = await api<{ deleted: boolean }>(`/kanban/${kanbanId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanbans"] });
    },
  });

  return { deleteKanban, isPending };
};
