'use client';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';

export const Provenance: React.FC = () => {
  return (
    <section className="py-16 bg-stone-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">Our Commitment to Authenticity</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 mb-6"></div>
            <p className="text-stone-300 text-lg leading-relaxed">
              Each artifact in our collection has been carefully sourced from the Democratic Republic of
              Congo over the past 35 years. While complete historical documentation may not always be
              available for pieces that have remained on the African continent, we provide all known
              information about provenance and cultural context for every item in our collection.
            </p>
            <Button className="mt-8 bg-amber-800 hover:bg-amber-900 border-amber-700">
              Learn About Our Authentication Process
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};