import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { useLogin } from "@/app/components/login-modal/hooks/mutations/use-login";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginFormType,
  loginSchema,
} from "@/app/components/login-modal/schemas/login-schema";
import { getValidationError } from "@/core/lib/get-validation-error";
import { validationErrorEmitter } from "@/core/lib/validation-error-observer";
import { ValidationException } from "@/core/exceptions/validation-exception";

export const LoginConent = () => {
  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn, isPending } = useLogin();
  const onSubmit = handleSubmit(
    (data) => {
      signIn(data);
    },
    (errors) => {
      const error = getValidationError(errors);
      validationErrorEmitter.emit(new ValidationException(error));
    }
  );

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl">Iniciar Sesión</DialogTitle>
        <DialogDescription>
          Ingresa tus credenciales para acceder a tu cuenta
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="login-email">Correo Electrónico</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="tu@email.com"
                {...field}
                required
              />
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="login-password">Contraseña</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                {...field}
                required
              />
            </div>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          Iniciar Sesión
        </Button>
      </form>
    </DialogContent>
  );
};
