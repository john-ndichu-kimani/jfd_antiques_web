"use client"

import React from 'react';
import { CategoryGrid } from './CategoryGrid';
import { useCategories } from '../../lib/services/category_services';

export const FeaturedCategories: React.FC = () => {
  const { categories, loading, error } = useCategories();
  
 

  if (error) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">
              Featured Categories
            </h2>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">
          Categories
          </h2>
          <div className="w-24 h-1 bg-amber-800 mx-auto mt-4"></div>
          <p className="mt-4 text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
            Explore our curated selection of featured collections, each representing unique
            artistic traditions and cultural heritage.
          </p>
        </div>
        
        <CategoryGrid
          categories={categories}
          loading={loading}
          columns={3}
          showFeatured={false}
        />
      </div>
    </section>
  );
};