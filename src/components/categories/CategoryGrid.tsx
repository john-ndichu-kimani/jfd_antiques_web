import React from 'react';
import { CategoryCard } from './CategoryCard';
import { Category } from '@/lib/services/category_services';

interface CategoryGridProps {
  categories: Category[];
  loading?: boolean;
  showFeatured?: boolean;
  columns?: 'auto' | 2 | 3 | 4;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  loading = false,
  showFeatured = true,
  columns = 'auto'
}) => {
  const getGridClasses = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (loading) {
    return (
      <div className={`grid ${getGridClasses()} gap-6`}>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="h-80 bg-stone-100 dark:bg-stone-700 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-stone-600 mb-2">No Categories Found</h3>
        <p className="text-stone-500">There are no categories available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClasses()} gap-6`}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
      
        />
      ))}
    </div>
  );
};
