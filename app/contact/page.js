"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const emailRegex = /\S+@\S+\.\S+/;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // allow empty email field without marking it as invalid
    if (newEmail === "") {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(emailRegex.test(newEmail));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid || !email) {
      toast.error("Veuillez entrer une adresse e-mail valide.");
      return;
    }
    if (!message.trim()) {
        toast.error("Veuillez entrer un message.");
        return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Votre message a été envoyé avec succès !");
        setEmail("");
        setMessage("");
      } else {
        toast.error(data.error?.message || data.error || "Erreur lors de l'envoi de votre message.");
      }
    } catch (error) {
      console.error("Échec de l'envoi du message :", error);
      toast.error("Une erreur inattendue est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = isSubmitting || !email || !message.trim() || !isEmailValid;

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Nous contacter</CardTitle>
          <CardDescription>
            Pour toute question ou demande, n'hésitez pas à nous laisser un message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Votre e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@exemple.com"
                value={email}
                onChange={handleEmailChange}
                className={cn(!isEmailValid && email && "border-red-500")}
              />
              {!isEmailValid && email && <p className="text-red-500 text-sm mt-1">Veuillez entrer une adresse e-mail valide.</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Votre message</Label>
              <Textarea
                id="message"
                placeholder="Écrivez votre message ici..."
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isButtonDisabled}>
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
