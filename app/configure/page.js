import { Suspense } from 'react';
import ConfigureForm from '@/components/ui/configure-form';

export const metadata = {
  title: 'Configurer Votre Clavier | Keyfab',
  description: "Utilisez notre configurateur pour choisir les composants de votre clavier mécanique ou décrivez-nous votre projet. Obtenez un devis pour votre clavier personnalisé.",
};

export default function ConfigurePage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-12 px-4 text-center"><p>Chargement du configurateur...</p></div>}>
      <ConfigureForm />
    </Suspense>
  );
}
