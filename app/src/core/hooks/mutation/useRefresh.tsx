import { useAuth } from "@/core/context/auth-context";
import { api } from "@/core/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useRefresh = () => {
  const { handleUser } = useAuth();
  const { mutateAsync: refresh, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api<{ accessToken: string }>("/auth/refresh", {
        method: "POST",
      });

      return response?.data;
    },
    onSuccess: (data) => {
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        handleUser(data.accessToken);
      }
    },
    onError: async () => {
      const response = await api("/auth/logout", {
        method: "POST",
      });
    },
  });

  return {
    refresh,
    isPending,
  };
};
