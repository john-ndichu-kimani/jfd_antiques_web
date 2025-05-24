'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Filter, X, ChevronDown, Search, Layers } from 'lucide-react';
import { getAllProducts, searchProducts } from '@/lib/services/product_service';
import { Product, ProductsResponse, Tribe } from '@/types/product';
import ProductCard from '@/components/products/ProductCard';

import { useCategories } from '../../lib/services/category_services';

// Default price range
const DEFAULT_PRICE_RANGE: [number, number] = [0, 10000];

export default function GalleryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTribes, setSelectedTribes] = useState<Tribe[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    pages: number;
  } | null>(null);

  // Data fetching
  const { categories: availableCategories } = useCategories();

  // Animation controls
  const controls = useAnimation();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  // Initialize filters from URL parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const tribe = searchParams.get('tribe');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (category) {
      setSelectedCategories([category.toLowerCase()]);
    } else {
      setSelectedCategories([]);
    }
  
    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery('');
    }
    
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
    } else {
      setPriceRange(DEFAULT_PRICE_RANGE);
    }
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = useCallback((newCategories: string[], newSearch: string, newPriceRange: [number, number]) => {
    const params = new URLSearchParams();
    
    if (newCategories.length > 0) {
      params.set('category', newCategories[0]);
    }
  
    if (newSearch) {
      params.set('search', newSearch);
    }
    
    if (newPriceRange[0] !== DEFAULT_PRICE_RANGE[0] || newPriceRange[1] !== DEFAULT_PRICE_RANGE[1]) {
      params.set('minPrice', newPriceRange[0].toString());
      params.set('maxPrice', newPriceRange[1].toString());
    }

    const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newURL, { scroll: false });
  }, [pathname, router]);

  // Fetch products based on filters
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let response: ProductsResponse;
      
      // Build parameters for API call
      const apiParams: any = {
        page: 1,
        limit: 50, // Get more products for client-side filtering
      };

      // Add filters to API params
      if (searchQuery.trim()) {
        apiParams.search = searchQuery.trim();
      }
      
      if (selectedCategories.length > 0) {
        apiParams.category = selectedCategories[0]; // Use category slug filter
      }
      
      if (priceRange[0] !== DEFAULT_PRICE_RANGE[0] || priceRange[1] !== DEFAULT_PRICE_RANGE[1]) {
        apiParams.minPrice = priceRange[0];
        apiParams.maxPrice = priceRange[1];
      }

      // Use search if there's a search query, otherwise get all products with filters
      if (searchQuery.trim()) {
        response = await searchProducts(searchQuery.trim());
      } else {
        response = await getAllProducts(apiParams);
      }

      if (response.success && response.data?.products) {
        let filteredProducts = response.data.products;

        // Apply additional client-side filters if needed
        if (!searchQuery.trim()) {
          filteredProducts = applyClientSideFilters(filteredProducts);
        }
        
        setProducts(filteredProducts);
        setPagination(response.pagination || {
          total: filteredProducts.length,
          page: 1,
          limit: filteredProducts.length,
          pages: 1
        });
      } else {
        throw new Error(response.message || 'Failed to load products');
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setProducts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategories, selectedTribes, priceRange]);

  // Apply client-side filters (for additional filtering not handled by API)
  const applyClientSideFilters = (products: Product[]): Product[] => {
    return products.filter(product => {
      // Category filter (backup check)
      if (selectedCategories.length > 0) {
        const productCategoryName = product.category?.name?.toLowerCase() || '';
        const productCategorySlug = product.category?.slug?.toLowerCase() || '';
        
        const categoryMatch = selectedCategories.some(selectedCat => {
          const selectedCatLower = selectedCat.toLowerCase();
          return (
            productCategoryName.includes(selectedCatLower) || 
            productCategorySlug === selectedCatLower ||
            selectedCatLower.includes(productCategoryName) ||
            productCategoryName === selectedCatLower
          );
        });
        
        if (!categoryMatch) return false;
      }

      // Price filter (backup check)
      const price = typeof product.price === 'string' ? 
        parseFloat(product.price) : 
        product.price;
      
      if (isNaN(price)) return true; // Include products with invalid prices
      
      return price >= priceRange[0] && price <= priceRange[1];
    });
  };

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Animation trigger
  useEffect(() => {
    if (isHeaderInView) {
      controls.start('visible');
    }
  }, [controls, isHeaderInView]);

  // Filter handlers
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [category] // Only allow one category at a time for simplicity
      : [];
    
    setSelectedCategories(newCategories);
    updateURL(newCategories, searchQuery, priceRange);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL(selectedCategories, value, priceRange);
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    updateURL(selectedCategories, searchQuery, newRange);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTribes([]);
    setSearchQuery('');
    setPriceRange(DEFAULT_PRICE_RANGE);
    router.push(pathname);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategories.length > 0 || 
                         selectedTribes.length > 0 || 
                         searchQuery.trim() !== '' || 
                         priceRange[0] !== DEFAULT_PRICE_RANGE[0] || 
                         priceRange[1] !== DEFAULT_PRICE_RANGE[1];

  return (
    <main className="relative min-h-screen">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="galleryPattern" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
            <circle cx="28" cy="28" r="2" fill="#8B4513" />
            <circle cx="0" cy="28" r="2" fill="#8B4513" />
            <circle cx="56" cy="28" r="2" fill="#8B4513" />
            <circle cx="28" cy="0" r="2" fill="#8B4513" />
            <circle cx="28" cy="56" r="2" fill="#8B4513" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#galleryPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6 }
              }
            }}
            className="text-center flex-grow"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">Collections</h1>
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-0.5 bg-amber-700"></div>
              <div className="w-3 h-3 mx-2 rounded-full bg-amber-700"></div>
              <div className="w-16 h-0.5 bg-amber-700"></div>
            </div>
          </motion.div>
          
        </div>

        {/* Search and Filter Row */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-stone-300 rounded-md w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Search products"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" aria-hidden="true" />
          </div>
          
          {/* Filter toggle button */}
          <div className="flex items-center space-x-4">
            {hasActiveFilters && (
              <button 
                onClick={clearAllFilters}
                className="text-sm text-amber-700 hover:text-amber-800 underline"
                type="button"
              >
                Clear all filters
              </button>
            )}
            <button 
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="flex items-center px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-md transition"
              type="button"
              aria-expanded={filtersVisible}
              aria-controls="filter-panel"
            >
              <Filter size={18} className="mr-2" aria-hidden="true" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="ml-1 bg-amber-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedCategories.length + selectedTribes.length + (searchQuery ? 1 : 0) + 
                   (priceRange[0] !== DEFAULT_PRICE_RANGE[0] || priceRange[1] !== DEFAULT_PRICE_RANGE[1] ? 1 : 0)}
                </span>
              )}
              <ChevronDown size={16} className={`ml-2 transition-transform ${filtersVisible ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedCategories.map(category => {
              const categoryLabel = availableCategories?.find(c => 
                c.slug?.toLowerCase() === category.toLowerCase() || 
                c.name.toLowerCase() === category.toLowerCase()
              )?.name || category.charAt(0).toUpperCase() + category.slice(1);
              
              return (
                <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                  Category: {categoryLabel}
                  <button 
                    onClick={() => handleCategoryChange(category, false)}
                    className="ml-2 hover:text-amber-900"
                    type="button"
                    aria-label={`Remove ${category} filter`}
                  >
                    <X size={14} />
                  </button>
                </span>
              );
            })}
           
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Search: "{searchQuery}"
                <button 
                  onClick={() => handleSearchChange('')}
                  className="ml-2 hover:text-green-900"
                  type="button"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {(priceRange[0] !== DEFAULT_PRICE_RANGE[0] || priceRange[1] !== DEFAULT_PRICE_RANGE[1]) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                Price: ${priceRange[0]} - ${priceRange[1]}
                <button 
                  onClick={() => handlePriceChange(DEFAULT_PRICE_RANGE)}
                  className="ml-2 hover:text-purple-900"
                  type="button"
                  aria-label="Reset price range"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results summary */}
        {pagination && !loading && (
          <div className="mb-6 text-stone-600">
            <p>
              Showing {products.length} of {pagination.total} products
              {hasActiveFilters && ' (filtered)'}
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row">
          {/* Filter sidebar */}
          <AnimatePresence>
            {filtersVisible && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="lg:w-64 flex-shrink-0 overflow-hidden bg-white p-4 rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-6"
                id="filter-panel"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-stone-800">Filter By</h3>
                  <button 
                    onClick={() => setFiltersVisible(false)} 
                    className="lg:hidden"
                    type="button"
                    aria-label="Close filter panel"
                  >
                    <X size={18} className="text-stone-500" />
                  </button>
                </div>
                
                {/* Filter categories */}
                <div className="space-y-6">
                  {availableCategories && availableCategories.length > 0 && (
                    <div>
                      <h4 className="font-medium text-stone-700 mb-3">Categories</h4>
                      <div className="space-y-2">
                        {availableCategories.map(category => {
                          const categoryIdentifier = category.slug || category.name.toLowerCase().replace(/\s+/g, '-');
                          const isSelected = selectedCategories.includes(categoryIdentifier);
                          
                          return (
                            <label key={category.id} className="flex items-center">
                              <input 
                                type="checkbox" 
                                className="mr-2"
                                checked={isSelected}
                                onChange={(e) => handleCategoryChange(categoryIdentifier, e.target.checked)}
                              />
                              <span className="text-sm text-stone-600">
                                {category.name} ({category._count?.products || 0})
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium text-stone-700 mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="10000" 
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-stone-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button 
                      onClick={clearAllFilters}
                      className="w-full px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition"
                      type="button"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
                <p className="mt-4 text-stone-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-stone-50 rounded-lg">
                <Layers className="mx-auto h-12 w-12 text-stone-300" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-medium text-stone-700">Error loading products</h3>
                <p className="mt-2 text-stone-500">{error}</p>
                <button 
                  onClick={() => fetchProducts()}
                  className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition"
                  type="button"
                >
                  Try Again
                </button>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-lg">
                <Layers className="mx-auto h-12 w-12 text-stone-300" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-medium text-stone-700">No products found</h3>
                <p className="mt-2 text-stone-500">
                  {hasActiveFilters ? 'No products match your current filters' : 'No products available'}
                </p>
                {hasActiveFilters && (
                  <button 
                    onClick={clearAllFilters}
                    className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition"
                    type="button"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}