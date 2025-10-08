"use client";

import { useState } from "react";
import { Button } from "@/core/components/ui/button";
import { RegisterModal } from "@/app/components/register-modal";

export function CTA() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            ¿Listo para mejorar tu productividad?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Únete a miles de equipos que ya confían en TaskFlow para gestionar
            sus proyectos
          </p>
          <Button size="lg" onClick={() => setShowRegister(true)}>
            Comenzar Ahora - Es Gratis
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 TaskFlow. Todos los derechos reservados.</p>
        </div>
      </footer>

      <RegisterModal open={showRegister} onOpenChange={setShowRegister} />
    </>
  );
}
