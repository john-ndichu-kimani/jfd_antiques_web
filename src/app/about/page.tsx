'use client';

import { motion } from 'framer-motion';
import { Metadata } from 'next';
import Image from 'next/image';
import { LucideQuote } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'Our Story | African Art Heritage',
//   description: 'Learn about JFD’s 50-year journey collecting authentic African art across Abidjan, Burundi, and Kenya.',
// };

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-amber-800">Our Story</h1>
        <p className="text-stone-600 mt-4 max-w-2xl mx-auto">
          A lifelong passion for African art, curated over decades by JFD, from the vibrant markets of Abidjan to the villages of Eastern Congo.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-stone-50 p-8 rounded-lg shadow-md"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src="https://via.placeholder.com/500x500"
              alt="JFD in Kenya"
              width={500}
              height={500}
              className="w-full h-96 object-cover rounded-md"
            />
          </div>
          <div className="md:w-1/2">
            <LucideQuote className="h-8 w-8 text-amber-500 mb-4" />
            <p className="text-stone-600 leading-relaxed">
              Thank you for visiting African Art Heritage. I have collected African art for about 50 years, beginning in Abidjan, then in East Africa, and now in Kenya, where I am retired with my collection. Most pieces were acquired in Bujumbura, Burundi, and Eastern Congo in the early 1990s, when authentic artifacts were still found in villages or stored collections from the Mobutu era.
            </p>
            <p className="text-stone-600 mt-4 leading-relaxed">
              My collection, primarily Lega masks, statues, and daily-life objects, reflects the wear of time—unlike pristine early 20th-century pieces, these were often forgotten in huts, adding to their authenticity. Distinguishing real artifacts from aged copies is challenging, but my expertise helps identify subtle differences. I invite you to explore the quality and stories behind each piece.
            </p>
            <p className="text-stone-600 mt-4 font-semibold">
              — JFD, Kenya
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}