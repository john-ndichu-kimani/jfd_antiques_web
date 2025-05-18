"use client"
import React from 'react';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const Gallery = () => {
    // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  // Placeholder images for African antiques (replace with actual JFD collection images)
  const antiques = [
    {
      src: '/images/gallery/gallery6.jpg',
  
    },
    {
      src: '/images/gallery/gallery5.jpg',
     
    },
    {
      src: '/images/gallery/gallery4.jpg',
   
    },
    {
      src: '/images/gallery/gallery1.jpg',
 
    },
    {
      src: '/images/gallery/gallery2.jpg',

    },
    {
      src: '/images/gallery/gallery3.jpg',

    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Introduction Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Gallery</h1>
         
        </div>

             <motion.section
          ref={heroRef}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-4 bg-amber-100 text-amber-800 font-medium rounded-full mb-3">
            Gallery
          </span>
          
   

        </motion.section>

        {/* Gallery Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {antiques.map((antique, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
            >
              <img
                src={antique.src}
                alt="gallery image"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;