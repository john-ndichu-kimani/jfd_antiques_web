'use client';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Info } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <img
          src="/images/hero0.jpg"
          alt="African Art Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h5 className="text-amber-500 font-medium mb-3">35 Years of Curation</h5>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Preserving African Cultural Heritage
            </h1>
            <p className="mt-6 text-stone-300 text-lg">
              Discover our meticulously curated collection of authentic Luba, Lega, and Hemba artifacts,
              sourced directly from the Democratic Republic of Congo over three decades.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button primary>
                Explore Collection <ArrowRight size={18} />
              </Button>
              <Button
                primary={false}
                className="bg-transparent border border-stone-400 bg-gray-200 text-stone-700 hover:bg-gray-100"
              >
                Our Story <Info size={18} />
              </Button>
            </div>
            <div className="mt-12 flex items-center">
              <MapPin size={18} className="text-amber-500 mr-2" />
              <span className="text-stone-300">
                Sourced directly from the Democratic Republic of Congo
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};