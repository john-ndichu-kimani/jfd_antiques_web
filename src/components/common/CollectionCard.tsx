

import { ArrowRight, Image, BookOpen, Star, Package, Bookmark } from 'lucide-react';
import { Button } from './Button';
import Link from 'next/link';
import { Collection } from '@/models/Collection';

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  // Select the appropriate icon based on collection name
  const getIcon = () => {
    if (collection.name.toLowerCase().includes('book')) {
      return <BookOpen size={32} className="text-amber-500" />;
    } else if (collection.name.toLowerCase().includes('package')) {
      return <Package size={32} className="text-amber-500" />;
    } else if (collection.name.toLowerCase().includes('art')) {
      return <Image size={32} className="text-amber-500" />;
    } else {
      return <Bookmark size={32} className="text-amber-500" />;
    }
  };

  return (
    <div className="h-40vh bg-stone-50 dark:bg-stone-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden flex flex-col group hover:bg-stone-100 dark:hover:bg-stone-700">
      {/* Icon and header section */}
      <div className="p-6 flex items-start justify-between border-b border-stone-200 dark:border-stone-700">
        <div className="flex items-center">
          <div className="mr-4 p-2 bg-stone-100 dark:bg-stone-700 rounded-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-100 dark:group-hover:bg-amber-900">
            {getIcon()}
          </div>
          <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100">{collection.name}</h3>
        </div>
        {collection.featured && (
          <div className="flex items-center text-amber-600 dark:text-amber-400">
            <Star size={16} className="mr-1" />
            <span className="text-xs font-medium">Featured</span>
          </div>
        )}
      </div>
      
      {/* Card content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-stone-500 dark:text-stone-400 mb-3">
          <span className="font-medium">{collection.items} artifacts</span>
        </div>
        
        <p className="text-stone-600 dark:text-stone-300 mb-6 line-clamp-3 flex-grow">
          {collection.description}
        </p>
        
        <div className="mt-auto">
          <Link href={`/collections?category=${collection.href}`}>
            <Button primary >
              <span>Explore Collection</span>
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};