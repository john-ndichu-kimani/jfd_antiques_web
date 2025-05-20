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
          
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">Our Story</h1>
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-0.5 bg-amber-700"></div>
            <div className="w-3 h-3 mx-2 rounded-full bg-amber-700"></div>
            <div className="w-16 h-0.5 bg-amber-700"></div>
          </div>
         
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
          <p>Thank you for coming to this site. I have collected African Art for about 50 years, first in Abidjan, and later in East Africa. Today I live in Kenya where I am retired. And I brought my collection with me.</p>

<p>I bought most of this collection when I was based in Bujumbura, Burundi, and I was travelling every week to Bukavu and Goma in Eastern Congo. In the early 90’s it was still possible to find a few real pieces.</p>
<br />
<p>Some of them were still in the villages, but the most interesting ones were pieces which had been stored at the time of Mobutu, and were sold, one by one, by the people who had the keys to the stores.</p>

<p>The big difference that you will see between the art which was brought to Europe in the early 20th century and my collection is the condition of the pieces. In the first half of the 20th century, the masks, the statues still had a meaning in the villages and were used in ceremonies. But later on they were forgotten in the corner of a hut of the village chief, and when this one died, the family would sell whatever appeared to have some value. Obviously those objects suffered from this and were not always in good shape.</p>
<br />
<p>It is true that the copies of ancient pieces are treated that way. They are left for some time in a termite mound or are covered with blood and forgotten for a while, leaving insects and rodent to “age” them.</p>

<p>It is sometime difficult to make the difference between the real thing and good copies, but there are usually one or two mistakes that allow the collector to make the difference. In addition, the copiers specialize in objects that are salable and forget the less common art.</p>
<br />
<p>As you can see on this site, I have collected quite a few masks, mostly Lega, but also from some other peoples. I have also a few objects which were part of the daily life of the people of the time. And some figures. I have only a few statues which I think are really equivalent to what you can find in museums.</p>

<p>If you are interested in those, please contact me.</p>
<br />
<p>We tried to present photos which would allow you to judge by yourself the quality of the pieces, in addition we give some indication regarding the wood, heavy or light, the paint, the repairs and the general condition, plus the size. You will notice that on many of them, you find stickers in the back. These are the numbers of the items in my collection.</p>

<p>Feel free to contact me by Email. if you have questions and wish to talk to me, please send your WhatsApp number, I will try to answer them.</p>
<br />
<p>Thank you again for visiting our site, I hope you like it.</p>

<p>Best regards, <br /> JFD</p>

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