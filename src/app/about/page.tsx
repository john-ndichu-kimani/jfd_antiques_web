'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Quote, Camera, MapPin, Calendar, User, BookOpen, Award, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  // Animation controls
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  useEffect(() => {
    if (isHeroInView) {
      controls.start('visible');
    }
  }, [controls, isHeroInView]);

  // Timeline data
  const timelineEvents = [
    { 
      year: '1970s', 
      title: 'First Encounters', 
      location: 'Abidjan, Ivory Coast',
      description: 'JFD began collecting African art in the vibrant markets of Abidjan, developing an eye for authentic tribal pieces.',
      icon: <Calendar className="h-6 w-6" />
    },
    { 
      year: '1980s', 
      title: 'Expanding Horizons', 
      location: 'East Africa',
      description: 'The collection grew as JFD traveled across East Africa, connecting with local communities and art dealers.',
      icon: <MapPin className="h-6 w-6" />
    },
    { 
      year: '1990s', 
      title: 'The Golden Era', 
      location: 'Bujumbura, Burundi & Eastern Congo',
      description: 'Most significant pieces were acquired during this period, when authentic artifacts could still be found in villages or from legacy collections of the Mobutu era.',
      icon: <Award className="h-6 w-6" />
    },
    { 
      year: '2000s', 
      title: 'Curation & Documentation', 
      location: 'Various Locations',
      description: 'Focused on researching, authenticating and documenting the collection, establishing provenance for key pieces.',
      icon: <BookOpen className="h-6 w-6" />
    },
    { 
      year: 'Present', 
      title: 'Preservation in Kenya', 
      location: 'Kenya',
      description: 'Now retired in Kenya, JFD maintains the collection with a focus on preservation and selective sharing with collectors and enthusiasts.',
      icon: <User className="h-6 w-6" />
    }
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="aboutPattern" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M32,0 L64,32 L32,64 L0,32 Z" fill="none" stroke="#8B4513" strokeWidth="0.5" />
            <path d="M16,16 L48,16 L48,48 L16,48 Z" fill="none" stroke="#8B4513" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#aboutPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
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
            Our Journey
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">Our Story</h1>
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-0.5 bg-amber-700"></div>
            <div className="w-3 h-3 mx-2 rounded-full bg-amber-700"></div>
            <div className="w-16 h-0.5 bg-amber-700"></div>
          </div>
          <p className="text-stone-600 text-lg max-w-3xl mx-auto">
            A lifelong passion for African art, curated over decades by JFD, from the vibrant markets of Abidjan to the villages of Eastern Congo and now preserved in Kenya.
          </p>
        </motion.section>

        {/* Main Profile Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-gradient-to-br from-stone-50 to-amber-50 p-8 md:p-12 rounded-lg shadow-lg mb-24 border border-amber-100"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src="/images/antiques/stool.jpg"
                  alt="JFD in Kenya"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-md shadow-md relative z-10"
                />
               
              </div>
            </div>
            <div className="md:w-1/2">
              <Quote className="h-10 w-10 text-amber-600 mb-6" />
              <p className="text-stone-700 leading-relaxed text-lg">
                Thank you for visiting African Art Heritage. I have collected African art for about 50 years, beginning in Abidjan, then in East Africa, and now in Kenya, where I am retired with my collection. Most pieces were acquired in Bujumbura, Burundi, and Eastern Congo in the early 1990s, when authentic artifacts were still found in villages or stored collections from the Mobutu era.
              </p>
              <p className="text-stone-700 mt-6 leading-relaxed text-lg">
                My collection, primarily Lega masks, statues, and daily-life objects, reflects the wear of time—unlike pristine early 20th-century pieces, these were often forgotten in huts, adding to their authenticity. Distinguishing real artifacts from aged copies is challenging, but my expertise helps identify subtle differences.
              </p>
              <p className="text-stone-700 mt-6 leading-relaxed text-lg">
                I invite you to explore the quality and stories behind each piece in this collection, which represents decades of passion and respect for African cultural heritage.
              </p>
              <div className="mt-8 flex items-center">
                <div className="w-12 h-1 bg-amber-700"></div>
                <p className="ml-4 text-amber-800 font-semibold text-lg">
                  — JFD, Kenya
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Collector's Journey Timeline */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800">A Collector's Journey</h2>
            <div className="w-24 h-1 bg-amber-700 mx-auto mt-4"></div>
          </div>

      <div className="relative">
  {/* Timeline connector - only visible on md and up */}
  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200 hidden md:block"></div>
  
  <div className="space-y-12 relative">
    {timelineEvents.map((event, index) => (
      <motion.div 
        key={event.year}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        className="relative"
      >
        {/* Desktop layout (md and up) - Zigzag pattern */}
        <div className="hidden md:flex items-center">
          {/* Left side content (even indexes) */}
          <div className={`w-1/2 pr-12 text-right ${index % 2 === 0 ? 'block' : 'invisible'}`}>
            <h3 className="text-2xl font-bold text-amber-800">{event.year}</h3>
            <h4 className="text-xl font-semibold text-stone-700 mt-2">{event.title}</h4>
            <div className="flex items-center mt-2 justify-end">
              <MapPin size={16} className="text-amber-600 mr-2" />
              <span className="text-stone-600">{event.location}</span>
            </div>
            <p className="text-stone-600 mt-3">{event.description}</p>
          </div>
          
          {/* Center timeline node */}
          <div className="flex items-center justify-center z-10">
            <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center shadow-lg">
              <div className="text-white">
                {event.icon}
              </div>
            </div>
          </div>
          
          {/* Right side content (odd indexes) */}
          <div className={`w-1/2 pl-12 ${index % 2 === 1 ? 'block' : 'invisible'}`}>
            <h3 className="text-2xl font-bold text-amber-800">{event.year}</h3>
            <h4 className="text-xl font-semibold text-stone-700 mt-2">{event.title}</h4>
            <div className="flex items-center mt-2">
              <MapPin size={16} className="text-amber-600 mr-2" />
              <span className="text-stone-600">{event.location}</span>
            </div>
            <p className="text-stone-600 mt-3">{event.description}</p>
          </div>
        </div>
        
        {/* Mobile layout (always stacked vertically) */}
        <div className="flex flex-col md:hidden">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center shadow-lg">
              <div className="text-white">{event.icon}</div>
            </div>
          </div>
          <div className="text-center px-4">
            <h3 className="text-2xl font-bold text-amber-800">{event.year}</h3>
            <h4 className="text-xl font-semibold text-stone-700 mt-2">{event.title}</h4>
            <div className="flex items-center mt-2 justify-center">
              <MapPin size={16} className="text-amber-600 mr-2" />
              <span className="text-stone-600">{event.location}</span>
            </div>
            <p className="text-stone-600 mt-3">{event.description}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>
        </motion.section>

        {/* Philosophy & Authentication */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 bg-stone-100 rounded-lg p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Collection Philosophy</h2>
              <div className="w-16 h-1 bg-amber-700 mb-6"></div>
              <p className="text-stone-600 leading-relaxed">
                My approach to collecting has always focused on authenticity rather than pristine condition. I value pieces that show genuine use and cultural significance—artifacts that have been part of actual ceremonies and daily life.
              </p>
              <p className="text-stone-600 leading-relaxed mt-4">
                Each piece in this collection was selected not only for its aesthetic qualities but also for its cultural and historical importance, representing the rich traditions of its origin community.
              </p>
              <p className="text-stone-600 leading-relaxed mt-4">
                I believe in ethical collecting practices and have always sought to acquire pieces through legitimate channels, respecting both international laws and the cultural heritage of source communities.
              </p>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Authentication Process</h2>
              <div className="w-16 h-1 bg-amber-700 mb-6"></div>
              <p className="text-stone-600 leading-relaxed">
                Distinguishing authentic artifacts from well-aged replicas requires expertise developed over decades. I evaluate pieces based on multiple factors:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-700 mr-2">•</span>
                  <span className="text-stone-600">Patina and wear patterns consistent with genuine use</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-700 mr-2">•</span>
                  <span className="text-stone-600">Material authenticity and age-appropriate construction techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-700 mr-2">•</span>
                  <span className="text-stone-600">Stylistic consistency with known tribal artistic traditions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-700 mr-2">•</span>
                  <span className="text-stone-600">Provenance and collection history when available</span>
                </li>
              </ul>
              <p className="text-stone-600 leading-relaxed mt-4">
                While no authentication process is infallible, my decades of experience in the field provide a strong foundation for evaluating the pieces in this collection.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact/Visit Information */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Experience the Collection</h2>
          <div className="w-24 h-1 bg-amber-700 mx-auto mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Selected pieces from the collection are available for viewing by appointment in Kenya. 
            For serious collectors, researchers, and enthusiasts interested in African art heritage, 
            please use the contact form to arrange a visit or inquiry.
          </p>
          <div className="mt-8">
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition duration-300"
            >
              Contact Us <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}