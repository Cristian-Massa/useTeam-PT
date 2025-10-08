import { CTA } from "@/app/components/cta";
import { Features } from "@/app/components/features";
import { Hero } from "@/app/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}
