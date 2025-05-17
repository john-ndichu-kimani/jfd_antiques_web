'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { Heritage } from '@/models/Heritage';

interface HeritageSectionProps {
  section: Heritage;
  index: number;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({ section, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="md:w-1/2">
        <img
          src={section.image}
          alt={section.title}
          className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
        />
      </div>
      <div className="md:w-1/2">
        <h3 className="text-2xl font-semibold text-stone-800">{section.title}</h3>
        <div className="w-16 h-1 bg-amber-800 mt-3 mb-4"></div>
        <p className="text-stone-600 leading-relaxed">{section.content}</p>
        <Button className="mt-6" primary={false}>
          Learn More <ArrowRight size={16} />
        </Button>
      </div>
    </motion.div>
  );
};