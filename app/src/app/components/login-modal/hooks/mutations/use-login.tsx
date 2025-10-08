import { LoginFormType } from "@/app/components/login-modal/schemas/login-schema";
import { useAuth } from "@/core/context/auth-context";
import { LoginResponse } from "@/core/interfaces/login-response";
import { api } from "@/core/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { handleUser } = useAuth();
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: async (data: LoginFormType) => {
      const response = await api<LoginResponse>("/auth/login", {
        method: "POST",
        body: { ...data },
      });
      return response?.data ?? null;
    },
    onSuccess: (data) => {
      if (!data) return;
      handleUser(data.accessToken);
    },
  });

  return {
    signIn,
    isPending,
  };
};
