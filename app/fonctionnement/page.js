import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Wrench, Package, DraftingCompass, FileText } from "lucide-react";

export const metadata = {
  title: 'Comment Ça Marche | Keyfab',
  description: "Découvrez le processus simple et transparent pour commander votre clavier personnalisé chez Keyfab. De la configuration à la livraison, on vous explique tout.",
};

export default function FonctionnementPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Comment Ça Marche ?</h1>
        <p className="max-w-3xl text-muted-foreground md:text-xl">
          De votre idée à votre bureau, découvrez comment nous donnons vie au clavier de vos rêves.
          Notre processus est simple, transparent et entièrement centré sur vos besoins.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3"><DraftingCompass size={24} />Option 1: Configurer</CardTitle>
            <CardDescription>Pour ceux qui aiment choisir.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>
              Utilisez notre configurateur pour choisir chaque composant. Vous avez déjà des pièces ?
              Pas de problème, décochez simplement les éléments que vous ne souhaitez pas commander chez nous.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full">
              <Link href="/configure">Configurer mon clavier</Link>
            </Button>
          </div>
        </Card>
                        <Card className="flex flex-col">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3"><FileText size={24} />Option 2: Décrire</CardTitle>
                            <CardDescription>Pour ceux qui ont une vision précise.</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p>
                              Décrivez-nous le clavier de vos rêves. Fournissez des mots-clés, des inspirations, ou même
                              des liens vers des produits (ex: Aliexpress). Notre équipe étudiera votre demande.
                            </p>
                          </CardContent>
                          <div className="p-6 pt-0">
                            <Button asChild className="w-full" variant="secondary">
                              <Link href="/configure?tab=describe">Décrire mon projet</Link>
                            </Button>
                          </div>
                        </Card>      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Votre Projet en 3 Étapes</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Mail className="w-8 h-8" />
            <CardTitle>1. Devis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Après l'envoi de votre demande, nous vous contactons pour discuter des détails et vous fournir un devis transparent. Aucune surprise.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Wrench className="w-8 h-8" />
            <CardTitle>2. Création</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Une fois le devis validé, nous commandons les pièces et assemblons votre clavier sur mesure avec la plus grande attention.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Package className="w-8 h-8" />
            <CardTitle>3. Livraison</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Votre clavier est testé, emballé avec soin et expédié. Notez que ce processus peut prendre plusieurs semaines.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
