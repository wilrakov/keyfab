import { Button } from "@/components/ui/button";
import { Hero1 } from "@/components/ui/hero1";
import Image from "next/image";

export const metadata = {
  title: 'Accueil | Keyfab - Claviers Mécaniques Sur Mesure',
  description: "Bienvenue chez Keyfab. Nous construisons des claviers mécaniques personnalisés de haute qualité. Commencez à configurer le vôtre dès aujourd'hui ou contactez-nous pour un projet unique.",
};

export default function Home() {
  return (
    <Hero1></Hero1>
  );
}
