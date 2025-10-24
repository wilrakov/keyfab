"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({ images, startIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="max-w-full max-h-full object-contain" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:text-white hover:bg-white/10 rounded-full"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/10 rounded-full"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/10 rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}