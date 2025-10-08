"use client";

import { LoginModal } from "@/app/components/login-modal";
import { RegisterModal } from "@/app/components/register-modal";
import { Button } from "@/core/components/ui/button";
import { useAuth } from "@/core/context/auth-context";
import { Columns3, CheckSquare, Users } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const { user } = useAuth();
  return (
    <>
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Columns3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">TaskFlow</span>
          </div>
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <LoginModal />
                <RegisterModal />
              </>
            ) : (
              <Link href="/dashboard">
                <Button>Ingresar</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Organiza tu trabajo de forma{" "}
            <span className="text-primary">visual y colaborativa</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            TaskFlow te ayuda a gestionar proyectos, tareas y equipos con
            tableros visuales intuitivos. Colabora en tiempo real y mantén todo
            organizado en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LoginModal />
            <RegisterModal />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Columns3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Tableros Visuales</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Organiza tareas en columnas personalizables
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Colaboración</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Trabaja en equipo en tiempo real
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Seguimiento</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Monitorea el progreso de tus proyectos
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
