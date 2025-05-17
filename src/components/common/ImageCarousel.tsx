'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.div
        className="relative w-full h-96 overflow-hidden rounded-lg"
        onClick={() => setIsZoomed(!isZoomed)}
        whileHover={{ scale: isZoomed ? 1 : 1.05 }}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} - View ${currentIndex + 1}`}
          fill
          className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
          priority
        />
      </motion.div>
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-stone-800 bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Previous image"
      >
        <LucideChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-stone-800 bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Next image"
      >
        <LucideChevronRight className="h-6 w-6" />
      </button>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-amber-500' : 'bg-stone-400'}`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}