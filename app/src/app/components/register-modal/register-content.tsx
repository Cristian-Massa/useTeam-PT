import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Button } from "@/core/components/ui/button";
import {
  RegisterFormType,
  registerSchema,
} from "@/app/components/register-modal/schemas/register-schema";
import { useRegister } from "@/app/components/register-modal/hooks/mutations/use-register";
import { getValidationError } from "@/core/lib/get-validation-error";
import { validationErrorEmitter } from "@/core/lib/validation-error-observer";
import { ValidationException } from "@/core/exceptions/validation-exception";

const RegisterContent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { signUp, isPending } = useRegister();
  const onSubmit = handleSubmit(
    (data) => {
      signUp(data);
    },
    (errors) => {
      const error = getValidationError(errors);
      validationErrorEmitter.emit(new ValidationException(error));
    }
  );

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl">Crear Cuenta</DialogTitle>
        <DialogDescription>
          Completa el formulario para comenzar a usar TaskFlow
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="register-name">Nombre Completo</Label>
              <Input
                id="register-name"
                type="text"
                placeholder="Juan Pérez"
                {...field}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="register-email">Correo Electrónico</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="tu@email.com"
                {...field}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="register-password">Contraseña</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                {...field}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          )}
        />
        <DialogFooter>
          <Button disabled={isPending} type="submit" className="w-full">
            Crear Cuenta
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default RegisterContent;
