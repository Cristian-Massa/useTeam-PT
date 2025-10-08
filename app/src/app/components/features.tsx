import { Layout, Zap, Shield, Bell } from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Interfaz Intuitiva",
    description:
      "Diseño limpio y fácil de usar que te permite enfocarte en lo importante",
  },
  {
    icon: Zap,
    title: "Rápido y Eficiente",
    description: "Crea, mueve y organiza tareas con solo arrastrar y soltar",
  },
  {
    icon: Shield,
    title: "Seguro y Confiable",
    description:
      "Tus datos están protegidos con encriptación de nivel empresarial",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    description:
      "Mantente al día con actualizaciones en tiempo real de tu equipo",
  },
];

export function Features() {
  return (
    <section className="container mx-auto px-4 py-20 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Todo lo que necesitas para ser productivo
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Herramientas poderosas diseñadas para equipos de todos los tamaños
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
