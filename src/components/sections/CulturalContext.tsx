'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { HeritageSection } from '../common/HeritageSection';
import { heritageSections } from '@/lib/data/heritage';

export default function CulturalContext() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section className="py-16 md:py-24 bg-stone-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="culturalPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M0,40 L40,0 L80,40 L40,80 Z" fill="none" stroke="#8B4513" strokeWidth="1" />
            <circle cx="40" cy="40" r="10" fill="none" stroke="#8B4513" strokeWidth="1" />
            <circle cx="40" cy="40" r="20" fill="none" stroke="#8B4513" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#culturalPattern)" />
        </svg>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-full w-4 bg-amber-800 opacity-10"></div>
      <div className="absolute right-0 top-0 h-full w-4 bg-amber-800 opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-4 bg-amber-100 text-amber-800 font-medium rounded-full mb-2">
            Cultural Context
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
            Understanding African Heritage
          </h2>
          
          <div className="flex justify-center items-center mt-4">
            <div className="w-12 h-0.5 bg-amber-800"></div>
            <div className="w-4 h-4 mx-2 rounded-full bg-amber-800"></div>
            <div className="w-12 h-0.5 bg-amber-800"></div>
          </div>
          
          <p className="mt-6 text-stone-600 max-w-2xl mx-auto text-lg">
            Explore the rich cultural traditions and historical significance behind the artifacts in our
            collection. Each piece tells a story of Africa's diverse heritage.
          </p>
        </motion.div>
        
        <div className="space-y-24">
          {heritageSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8,
                    delay: 0.2 + (index * 0.1)
                  }
                }
              }}
            >
              <HeritageSection section={section} index={index} />
            </motion.div>
          ))}
        </div>
        
        {/* Decorative bottom element */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <svg className="w-24 h-12 text-amber-800 opacity-20" viewBox="0 0 24 12">
              <path 
                d="M0,6 L12,0 L24,6 L12,12 Z" 
                fill="currentColor"
              />
            </svg>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-2 h-2 rounded-full bg-amber-800"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}