import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { Collection } from '@/models/Collection';

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg group">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
      <img
        src={collection.image}
        alt={collection.name}
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className="text-xl font-semibold text-white">{collection.name}</h3>
        <p className="text-stone-200 mt-1 text-sm">{collection.items} artifacts</p>
        <p className="text-stone-300 mt-2 text-sm line-clamp-2">{collection.description}</p>
        <Button className="mt-4 text-sm px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white border border-white/40">
          Explore Collection <ArrowRight size={16} />
        </Button>
      </div>
      {collection.featured && (
        <div className="absolute top-4 left-4 bg-amber-800 text-white text-xs font-bold py-1 px-3 rounded-full z-20">
          Featured
        </div>
      )}
    </div>
  );
};