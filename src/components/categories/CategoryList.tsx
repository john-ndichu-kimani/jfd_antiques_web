"use client"
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CategoryGrid } from './CategoryGrid';
import { useCategories } from '@/lib/services/category_services';

interface CategoryListProps {
  showSearch?: boolean;
  showFeaturedFilter?: boolean;
  columns?: 'auto' | 2 | 3 | 4;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  showSearch = true,
  showFeaturedFilter = true,
  columns = 3
}) => {
  const { categories, loading, error } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredCategories = Array.isArray(categories)
  ? categories.filter(category => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesFeatured = !showFeaturedOnly || category.featured;

      return matchesSearch && matchesFeatured;
    })
  : [];



  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Filter size={64} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Error Loading Categories</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      {(showSearch || showFeaturedFilter) && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-stone-700 dark:border-stone-600 dark:text-white"
              />
            </div>
          )}
          
          {showFeaturedFilter && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured-filter"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="featured-filter" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Featured only
              </label>
            </div>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-stone-600 dark:text-stone-400">
        {!loading && (
          <span>
            Showing {filteredCategories.length} of {categories.length} categories
          </span>
        )}
      </div>

      {/* Category Grid */}
      <CategoryGrid
        categories={filteredCategories}
        loading={loading}
        columns={columns}
      />
    </div>
  );
};
