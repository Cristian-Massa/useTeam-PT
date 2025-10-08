import { useLogin } from "@/app/components/login-modal/hooks/mutations/use-login";
import { RegisterFormType } from "@/app/components/register-modal/schemas/register-schema";
import { User } from "@/core/interfaces/user";
import { api } from "@/core/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useRegister = (data: RegisterFormType) => {
  const { signIn } = useLogin();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api<User>("/auth/register", {
        method: "POST",
        body: { ...data },
      });
      return response?.data ?? null;
    },
    onSuccess: () => {
      const { email, password } = data;
      signIn({
        email,
        password,
      });
    },
  });

  return {
    signUp,
    isPending,
  };
};
