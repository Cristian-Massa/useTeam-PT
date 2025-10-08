"use client";

import { LoginConent } from "@/app/components/login-modal/login-content";
import { Button } from "@/core/components/ui/button";
import { Dialog, DialogTrigger } from "@/core/components/ui/dialog";

export function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Iniciar Sesión</Button>
      </DialogTrigger>
      <LoginConent />
    </Dialog>
  );
}
