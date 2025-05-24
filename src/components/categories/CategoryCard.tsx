import React from 'react';
import Link from 'next/link';
import { ArrowRight, Image, Star } from 'lucide-react';
import { Button } from '../common/Button';
import { Category } from '@/lib/services/category_services';

interface CategoryCardProps {
  category: Category;
  showFeatured?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  showFeatured = true
}) => {
  return (
    <div className="h-30 bg-white dark:bg-stone-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden flex flex-col group hover:bg-stone-50 dark:hover:bg-stone-700">
      {/* Content section */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">
          {category.name}
        </h3>
        
        {category.description && (
          <p className="text-stone-600 dark:text-stone-300 mb-4 line-clamp-3 flex-grow">
            {category.description}
          </p>
        )}
        
        <div className="mt-auto">
          <Link href={`/collections?category=${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <Button primary className="w-full size-sm">
              <span>Explore Category</span>
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};