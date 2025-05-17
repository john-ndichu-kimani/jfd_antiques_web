'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from './Button';
import { Artifact } from '@/models/Artifact';

interface ArtifactCardProps {
  artifact: Artifact;
}

export const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={artifact.image}
          alt={artifact.name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md hover:bg-stone-100">
          <Heart size={18} className="text-stone-600 hover:text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-amber-800">{artifact.tribe} Tribe</p>
            <h3 className="text-lg font-semibold text-stone-800 mt-1">{artifact.name}</h3>
          </div>
          <p className="text-lg font-bold text-stone-800">${artifact.price.toLocaleString()}</p>
        </div>
        <p className="mt-2 text-stone-600 text-sm line-clamp-2">{artifact.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xs text-stone-500">{artifact.age}</p>
          <Button primary={false} className="text-sm px-4 py-2">
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};