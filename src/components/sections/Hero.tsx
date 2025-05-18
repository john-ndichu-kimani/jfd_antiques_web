'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Info } from 'lucide-react';
import { Button } from '../common/Button';

export default function Hero() {
  // State to control the pattern animation
  const [patternOffset, setPatternOffset] = useState(0);
  
  // Subtle animation for the background pattern
  useEffect(() => {
    const interval = setInterval(() => {
      setPatternOffset(prev => (prev + 0.5) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-stone-900 to-stone-950">
      <div className="container mx-auto px-6 md:px-10 relative z-10 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content - left side */}
          <motion.div 
            className="max-w-xl lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-amber-300 leading-tight">
              JFD Collections African <br /> Antiques
            </h1>
            
            <p className="mt-4 text-stone-100 text-md ">
              Welcome to JFD Collections, a refined collection of authentic African antiques gathered over nearly 50 years across West and East Africa. Most pieces were acquired in the early 1990s from Bujumbura and Eastern Congo, when genuine artifacts were still found in villages and legacy collections from the Mobutu era.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/collections">
                <Button primary>
                  Explore Collections <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  primary={false}
                  className="bg-gray-300 border border-stone-400 text-stone-200 hover:bg-amber-100 hover:text-amber-900"
                >
                  Read More <Info size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center">
              <MapPin size={18} className="text-amber-400 mr-2" />
              <span className="text-stone-200">
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
              {/* Decorative circle behind the artifact */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-900 opacity-20 blur-lg"></div>
              
              {/* The artifact image */}
              <motion.img
                src="/images/jfd_hero.png"
                alt="Featured African Artifact"
                className="relative z-10 max-h-96 object-contain drop-shadow-2xl"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Decorative tribal pattern elements */}
              <div className="absolute -right-16 top-1/4 w-16 h-32 opacity-20 rotate-12">
                <svg viewBox="0 0 100 200" className="w-full h-full">
                  <path d="M50,0 L100,50 L50,100 L0,50 Z" fill="none" stroke="#F59E0B" strokeWidth="2" />
                  <path d="M50,100 L100,150 L50,200 L0,150 Z" fill="none" stroke="#F59E0B" strokeWidth="2" />
                </svg>
              </div>
              
              <div className="absolute -left-16 bottom-1/4 w-16 h-32 opacity-20 -rotate-12">
                <svg viewBox="0 0 100 200" className="w-full h-full">
                  <path d="M50,0 L100,50 L50,100 L0,50 Z" fill="none" stroke="#F59E0B" strokeWidth="2" />
                  <path d="M50,100 L100,150 L50,200 L0,150 Z" fill="none" stroke="#F59E0B" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-amber-700 opacity-30"></div>
    </section>
  );
}