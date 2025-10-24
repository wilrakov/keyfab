"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export function ComponentSection({ title, componentKey, data, selection, onSelectionChange, customUrl, onCustomUrlChange, isEnabled, onEnabledChange, children, imageUrl, onImageClick }) {
  return (
    <div className={cn(
      "space-y-4 p-6 border rounded-lg transition-all duration-300",
      isEnabled ? "bg-card shadow-lg" : "bg-muted/20 border-dashed"
    )}>
      <div className="flex items-center space-x-3">
        <Checkbox id={`use-${componentKey}`} checked={isEnabled} onCheckedChange={onEnabledChange} />
        <Label htmlFor={`use-${componentKey}`} className="text-xl font-semibold cursor-pointer">
          {title}
        </Label>
      </div>
      {isEnabled && (
        <div className="pl-4 md:pl-8 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <Label htmlFor={`select-${componentKey}`} className="sr-only">Sélectionner {title}</Label>
              <Select value={selection} onValueChange={onSelectionChange}>
                <SelectTrigger id={`select-${componentKey}`}>
                  <SelectValue placeholder={`Sélectionnez un(e) ${componentKey}`} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(data).map(([key, item]) => (
                    <SelectItem key={key} value={key}>
                      {item.name || key} ({item.price || item.prix})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {children}

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Ou fournissez le vôtre</span>
                </div>
              </div>
              <Input
                placeholder="Collez un lien pour un choix personnalisé (ex: AliExpress, Amazon)"
                value={customUrl}
                onChange={(e) => onCustomUrlChange(e.target.value)}
              />
            </div>
            <div className="relative w-full h-60 rounded-lg shadow-inner overflow-hidden group bg-background flex items-center justify-center">
              {imageUrl ? (
                <button type="button" onClick={onImageClick} className="w-full h-full">
                  <Image 
                    src={imageUrl} 
                    alt={`Image de ${selection}`} 
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ) : (
                <span className="text-muted-foreground text-sm text-center p-4">Sélectionnez un article pour voir son image</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
