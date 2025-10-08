import { User } from "@/core/interfaces/user";
import { api } from "@/core/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  const { data: me, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api<User>("/users/me", {
        method: "GET",
      });

      return response?.data ?? null;
    },
  });

  return { me, isPending };
};
