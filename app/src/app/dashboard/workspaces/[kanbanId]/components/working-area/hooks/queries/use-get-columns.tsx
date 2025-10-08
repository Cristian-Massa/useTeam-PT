import { Column } from "@/core/interfaces/columns";
import { api } from "@/core/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useGetColumns = () => {
  const { kanbanId } = useParams();
  const { data: columns, isPending } = useQuery({
    queryKey: ["columns"],
    queryFn: async () => {
      const response = await api<Column[]>(`/columns/${kanbanId}`, {
        method: "GET",
      });
      return response?.data ?? [];
    },
    enabled: !!kanbanId,
  });

  return { columns, isPending };
};
