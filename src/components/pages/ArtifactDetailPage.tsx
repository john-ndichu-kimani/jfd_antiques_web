'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { Button } from '../common/Button';
import { Artifact } from '@/models/Artifact';
import { useRouter } from 'next/navigation';

// Assuming Artifact model includes multiple images
interface ArtifactWithImages extends Artifact {
  images: string[];
  material: string;
}

interface ArtifactDetailPageProps {
  artifact: ArtifactWithImages;
}

export const ArtifactDetailPage: React.FC<ArtifactDetailPageProps> = ({ artifact }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % artifact.images.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + artifact.images.length) % artifact.images.length);
    setIsZoomed(false);
  };

  // Toggle zoom for 3D-like effect
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <section className="py-16 bg-stone-100 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          primary={false}
          className="mb-6 flex items-center gap-2 text-stone-600 hover:text-stone-800"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} /> Back to Artifacts
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative">
            <div className="relative h-[500px] bg-white rounded-lg overflow-hidden shadow-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={artifact.images[currentImageIndex]}
                  alt={`${artifact.name} - Image ${currentImageIndex + 1}`}
                  style={{width:"100%",height:"100%",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}
                  className={`cursor-zoom-in transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={toggleZoom}
                />
              </AnimatePresence>

              {/* Zoom Toggle Button */}
              <button
                className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md hover:bg-stone-100"
                onClick={toggleZoom}
              >
                <ZoomIn size={18} className="text-stone-600" />
              </button>

              {/* Navigation Arrows */}
              {artifact.images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-stone-100"
                    onClick={prevImage}
                  >
                    <ArrowLeft size={18} className="text-stone-600" />
                  </button>
                  <button
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-stone-100"
                    onClick={nextImage}
                  >
                    <ArrowRight size={18} className="text-stone-600" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {artifact.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {artifact.images.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`${artifact.name} - Thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                      currentImageIndex === index ? 'border-amber-800' : 'border-transparent'
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsZoomed(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-sm font-medium text-amber-800">{artifact.tribe} Tribe</p>
            <h1 className="text-3xl font-bold text-stone-800 mt-2">{artifact.name}</h1>
            <p className="text-2xl font-semibold text-stone-800 mt-2">
              ${artifact.price.toLocaleString()}
            </p>
            <p className="mt-4 text-stone-600">{artifact.description}</p>
            <div className="mt-6 space-y-4">
             
              
              <div>
                <p className="text-sm font-medium text-stone-700">Material</p>
                <p className="text-stone-600">{artifact.material || 'Traditional materials'}</p>
              </div>
            </div>
            <Button className="mt-6 w-full py-3">Add to Cart</Button>
          </div>
        </div>
      </div>
    </section>
  );
};