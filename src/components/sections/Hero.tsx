'use client';

import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Info } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  return (
    <section className="bgstone-900 to-stone-800  relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-500 blur-3xl"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 rounded-full bg-amber-700 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-stone-600 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content - left side */}
          <motion.div 
            className="max-w-xl lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
              Authentic Antiques
            </h1>
            
            <p className="mt-4 text-stone-700 text-lg">
              Rare Lega masks and artifacts acquired directly from Eastern Congo in the early 90s, 
              curated by a lifetime collector.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <Button primary>
                Explore Collection <ArrowRight size={18} />
              </Button>
              <Button
                primary={false}
                className="bg-transparent border border-stone-400 text-stone-200 hover:bg-stone-800 hover:text-white"
              >
                Our Story <Info size={18} />
              </Button>
            </div>
            
            <div className="mt-8 flex items-center">
              <MapPin size={18} className="text-amber-400 mr-2" />
              <span className="text-stone-700">
                Kenya-based collection from the Democratic Republic of Congo
              </span>
            </div>
          </motion.div>
          
          {/* Artifact image - right side */}
          <motion.div 
            className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
          >
            <div className="relative">
              {/* Circular glow behind artifact */}
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl"></div>
              
              {/* The artifact image */}
              <img
                src="/images/jfd_hero.png"
                alt="Featured African Artifact"
                className="relative z-10 max-h-80 object-contain drop-shadow-2xl"
              />
              
            
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};