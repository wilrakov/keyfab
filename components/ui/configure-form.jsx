"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ComponentSection } from "@/components/ui/component-section";
import { Lightbox } from "@/components/ui/lightbox";
import { toast } from "sonner";

const ASSEMBLY_FEE = 25;

const parsePrice = (priceString) => {
  if (!priceString) return 0;
  const price = parseFloat(priceString.replace("€", ""));
  return isNaN(price) ? 0 : price;
};

const emailRegex = /\S+@\S+\.\S+/;

export default function ConfigureForm() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'describe' ? 'describe' : 'parts';

  const [componentsData, setComponentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], startIndex: 0 });

  useEffect(() => {
    fetch('/composant.json')
      .then(res => res.json())
      .then(data => {
        setComponentsData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load components data:", error);
        toast.error("Impossible de charger les données des composants.");
        setLoading(false);
      });
  }, []);

  const [useBarebone, setUseBarebone] = useState(false);
  const [selectedBarebone, setSelectedBarebone] = useState("");
  const [selectedBareboneColor, setSelectedBareboneColor] = useState("");
  const [customBareboneUrl, setCustomBareboneUrl] = useState("");

  const [useSwitches, setUseSwitches] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState("");
  const [customSwitchUrl, setCustomSwitchUrl] = useState("");

  const [useKeycaps, setUseKeycaps] = useState(false);
  const [selectedKeycaps, setSelectedKeycaps] = useState("");
  const [customKeycapsUrl, setCustomKeycapsUrl] = useState("");

  const [precisionText, setPrecisionText] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [totalPrice, setTotalPrice] = useState(0);
  const [descriptionText, setDescriptionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allSwitches = componentsData ? Object.values(componentsData.switchs).reduce((acc, category) => ({...acc, ...category}), {}) : {};

  useEffect(() => {
    if (!componentsData) return;

    let partsPrice = 0;
    if (useBarebone && selectedBarebone && componentsData.barebones[selectedBarebone]) {
      partsPrice += parsePrice(componentsData.barebones[selectedBarebone].price);
    }
    if (useSwitches && selectedSwitch && allSwitches[selectedSwitch]) {
      partsPrice += parsePrice(allSwitches[selectedSwitch].prix);
    }
    if (useKeycaps && selectedKeycaps && componentsData.keycaps[selectedKeycaps]) {
      partsPrice += parsePrice(componentsData.keycaps[selectedKeycaps].price);
    }

    const isAssemblyRequested = partsPrice > 0 || customBareboneUrl || customSwitchUrl || customKeycapsUrl;
    
    setTotalPrice(isAssemblyRequested ? partsPrice + ASSEMBLY_FEE : partsPrice);

  }, [useBarebone, selectedBarebone, customBareboneUrl, useSwitches, selectedSwitch, customSwitchUrl, useKeycaps, selectedKeycaps, customKeycapsUrl, allSwitches, componentsData]);

  useEffect(() => {
    if (useBarebone && selectedBarebone && componentsData) {
      const barebone = componentsData.barebones[selectedBarebone];
      if (barebone.colors && barebone.colors.length > 0) {
        if (!barebone.colors.includes(selectedBareboneColor)) {
          setSelectedBareboneColor(barebone.colors[0]);
        }
      } else {
        setSelectedBareboneColor('');
      }
    }
  }, [useBarebone, selectedBarebone, selectedBareboneColor, componentsData]);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(emailRegex.test(newEmail));
  };

  const openLightbox = (images, startIndex = 0) => {
    setLightbox({ isOpen: true, images, startIndex });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, images: [], startIndex: 0 });
  };

  const getComponentImages = (componentKey, selection) => {
    if (!componentsData || !selection) return [];
    let imageSource;
    if (componentKey === 'barebone') imageSource = componentsData.barebones[selection]?.image;
    if (componentKey === 'switches') imageSource = allSwitches[selection]?.image;
    if (componentKey === 'keycaps') imageSource = componentsData.keycaps[selection]?.image;

    if (typeof imageSource === 'string') return [imageSource];
    if (typeof imageSource === 'object' && imageSource !== null) return Object.values(imageSource);
    return [];
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p>Chargement des composants...</p>
      </div>
    );
  }

  if (!componentsData) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p>Erreur de chargement des composants. Veuillez réessayer plus tard.</p>
      </div>
    );
  }

  const bareboneImageUrl = useBarebone && selectedBarebone && selectedBareboneColor && componentsData
    ? componentsData.barebones[selectedBarebone].image[selectedBareboneColor]
    : (useBarebone && selectedBarebone && componentsData ? Object.values(componentsData.barebones[selectedBarebone].image)[0] : null);

  const switchImageUrl = useSwitches && selectedSwitch && allSwitches[selectedSwitch]
    ? allSwitches[selectedSwitch].image
    : null;

  const keycapsImageUrl = useKeycaps && selectedKeycaps && componentsData && componentsData.keycaps[selectedKeycaps]
    ? Object.values(componentsData.keycaps[selectedKeycaps].image)[0]
    : null;

  const currentBarebone = useBarebone && selectedBarebone && componentsData ? componentsData.barebones[selectedBarebone] : null;

  const isOrderButtonDisabled = isSubmitting || !isEmailValid || !email || (
    totalPrice === 0 &&
    !customBareboneUrl &&
    !customSwitchUrl &&
    !customKeycapsUrl
  );

  const isDescriptionButtonDisabled = isSubmitting || !descriptionText.trim() || !isEmailValid || !email;

  const handleSubmitOrder = async () => {
    if (!isEmailValid || !email) {
      toast.error("Veuillez entrer une adresse e-mail valide.");
      return;
    }
    setIsSubmitting(true);

    const orderDetails = {
      barebone: {
        enabled: useBarebone,
        selection: selectedBarebone,
        color: selectedBareboneColor,
        custom: customBareboneUrl,
      },
      switches: {
        enabled: useSwitches,
        selection: selectedSwitch,
        custom: customSwitchUrl,
      },
      keycaps: {
        enabled: useKeycaps,
        selection: selectedKeycaps,
        custom: customKeycapsUrl,
      },
      totalPrice: totalPrice,
      precision: precisionText,
      email: email,
    };

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'parts', orderDetails }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Votre demande d'assemblage a été envoyée avec succès !");
      } else {
        toast.error(data.error?.message || data.error || 'Erreur lors de l\'envoi de votre demande.');
      }
    } catch (error) {
      console.error('Échec de la soumission de la commande :', error);
      toast.error('Une erreur inattendue est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitDescription = async () => {
    if (!isEmailValid || !email) {
      toast.error("Veuillez entrer une adresse e-mail valide.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'description', description: descriptionText, email: email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Votre description a été envoyée avec succès ! Nous vous contacterons bientôt.");
        setDescriptionText('');
      } else {
        toast.error(data.error?.message || data.error || 'Erreur lors de l\'envoi de votre description.');
      }
    } catch (error) {
      console.error('Échec de la soumission de la description :', error);
      toast.error('Une erreur inattendue est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {lightbox.isOpen && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          onClose={closeLightbox}
        />
      )}
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">Créez le clavier de vos rêves</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Choisissez l'une de nos options sur mesure pour créer le clavier parfait pour vos besoins.
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 h-auto">
            <TabsTrigger value="parts" className="text-sm sm:text-base">Option 1 : Choisissez vos pièces</TabsTrigger>
            <TabsTrigger value="describe" className="text-sm sm:text-base">Option 2 : Décrivez votre vision</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parts" className="mt-6">
            <Card className="border-none shadow-none">
              <CardHeader className="text-center pb-4">
                <CardDescription className="text-base">
                  Sélectionnez les composants que vous souhaitez que nous assemblions pour vous. Vous pouvez également fournir des liens vers des pièces personnalisées.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <ComponentSection
                  title="Kit Barebone"
                  componentKey="barebone"
                  data={componentsData.barebones}
                  selection={selectedBarebone}
                  onSelectionChange={setSelectedBarebone}
                  customUrl={customBareboneUrl}
                  onCustomUrlChange={setCustomBareboneUrl}
                  isEnabled={useBarebone}
                  onEnabledChange={setUseBarebone}
                  imageUrl={bareboneImageUrl}
                  onImageClick={() => openLightbox(getComponentImages('barebone', selectedBarebone))}
                >
                  {currentBarebone && currentBarebone.colors && (
                    <div className="pt-2">
                      <Label className="mb-2 block text-sm font-medium">Choisir la couleur</Label>
                      <RadioGroup value={selectedBareboneColor} onValueChange={setSelectedBareboneColor} className="flex flex-wrap gap-3">
                        {currentBarebone.colors.map(color => (
                          <div key={color}>
                            <RadioGroupItem value={color} id={`${selectedBarebone}-${color}`} className="sr-only" />
                            <Label 
                              htmlFor={`${selectedBarebone}-${color}`}
                              className={cn(
                                "flex items-center justify-center rounded-md border px-4 py-2 cursor-pointer text-sm transition-colors duration-200",
                                selectedBareboneColor === color ? "bg-primary text-primary-foreground border-primary" : "hover:bg-accent hover:text-accent-foreground"
                              )}
                            >
                              {color.charAt(0).toUpperCase() + color.slice(1)}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </ComponentSection>

                <ComponentSection
                  title="Switches"
                  componentKey="switches"
                  data={allSwitches}
                  selection={selectedSwitch}
                  onSelectionChange={setSelectedSwitch}
                  customUrl={customSwitchUrl}
                  onCustomUrlChange={setCustomSwitchUrl}
                  isEnabled={useSwitches}
                  onEnabledChange={setUseSwitches}
                  imageUrl={switchImageUrl}
                  onImageClick={() => openLightbox(getComponentImages('switches', selectedSwitch))}
                />

                <ComponentSection
                  title="Keycaps"
                  componentKey="keycaps"
                  data={componentsData.keycaps}
                  selection={selectedKeycaps}
                  onSelectionChange={setSelectedKeycaps}
                  customUrl={customKeycapsUrl}
                  onCustomUrlChange={setCustomKeycapsUrl}
                  isEnabled={useKeycaps}
                  onEnabledChange={setUseKeycaps}
                  imageUrl={keycapsImageUrl}
                  onImageClick={() => openLightbox(getComponentImages('keycaps', selectedKeycaps))}
                />

                <div>
                  <Label htmlFor="precision-text" className="text-base font-medium">Précisions (optionnel)</Label>
                  <Textarea
                    id="precision-text"
                    placeholder="Si vous avez des demandes spécifiques (ex: lubrification des switches, modification particulière...), indiquez-les ici."
                    className="mt-2 text-base"
                    value={precisionText}
                    onChange={(e) => setPrecisionText(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-6 mt-8 pt-6 border-t">
                <div className="w-full text-center text-sm text-muted-foreground">
                  <p>Des frais d\'assemblage de 25€ s\'appliquent et sont ajoutés au prix total.</p>
                </div>
                <div className="w-full">
                  <Label htmlFor="email-parts" className="text-base font-medium">Votre adresse e-mail</Label>
                  <Input
                    id="email-parts"
                    type="email"
                    placeholder="nom@exemple.com"
                    value={email}
                    onChange={handleEmailChange}
                    className={cn("mt-2 text-base", !isEmailValid && email && "border-red-500")}
                  />
                  {!isEmailValid && email && <p className="text-red-500 text-sm mt-1">Veuillez entrer une adresse e-mail valide.</p>}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full">
                  <div className="text-xl sm:text-3xl font-bold">
                    Prix estimé : <Badge variant="secondary" className="text-xl sm:text-3xl px-3 py-1">{totalPrice}€</Badge>
                  </div>
                  <Button size="lg" onClick={handleSubmitOrder} disabled={isOrderButtonDisabled}>
                    {isSubmitting ? 'Envoi...' : 'Demander l\'assemblage'}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="describe" className="mt-6">
            <Card className="border-none shadow-none">
              <CardHeader className="text-center pb-4">
                <CardDescription className="text-base">
                  Vous ne savez pas par où commencer ? Décrivez-nous simplement ce que vous recherchez, et nous vous proposerons une configuration complète.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="ex: 'Un clavier 65% silencieux avec un look rétro pour mon bureau', 'Un clavier gaming flashy avec RGB et switchs clicky', etc."
                  rows={12}
                  className="text-base"
                  value={descriptionText}
                  onChange={(e) => setDescriptionText(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-6 mt-8 pt-6 border-t">
                <div className="w-full">
                  <Label htmlFor="email-describe" className="text-base font-medium">Votre adresse e-mail</Label>
                  <Input
                    id="email-describe"
                    type="email"
                    placeholder="nom@exemple.com"
                    value={email}
                    onChange={handleEmailChange}
                    className={cn("mt-2 text-base", !isEmailValid && email && "border-red-500")}
                  />
                  {!isEmailValid && email && <p className="text-red-500 text-sm mt-1">Veuillez entrer une adresse e-mail valide.</p>}
                </div>
                <div className="flex justify-end w-full">
                  <Button size="lg" onClick={handleSubmitDescription} disabled={isDescriptionButtonDisabled}>
                    {isSubmitting ? 'Envoi...' : 'Envoyer la description'}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
