"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import RegisterContent from "@/app/components/register-modal/register-content";

export function RegisterModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Registrarse</Button>
      </DialogTrigger>
      <RegisterContent />
    </Dialog>
  );
}
