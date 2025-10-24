import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Hero1 = ({
  badge = "✨ Votre constructeur de claviers",
  heading = "Keyfab, un service d'assemblage de clavier",
  description = "Chez Keyfab, nous fabriquons votre clavier, nous allons de la recherche des meilleures pièces jusqu'au traitement accoustique en passant par la lubrification de vos switchs.",
  buttons = {
    primary: {
      text: "Découvrez comment on fonctionne",
      url: "/fonctionnement",
    },
    secondary: {
      text: "Configurer son clavier",
      url: "/configure",
    },
  },
  image = {
    src: "/clavier1.webp",
    alt: "Hero section demo image showing interface components",
  },
}) => {
  return (
    <section className="md:py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero1 };