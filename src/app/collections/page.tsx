'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Filter, X, ChevronDown, Info, Layers, MapPin, Search } from 'lucide-react';
import { getAllProducts, getProductsByCategory, getProductsByTribe, searchProducts } from '@/lib/services/product_service';
import { Product, ProductsResponse } from '@/types/product';





export default function GalleryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation controls
  const controls = useAnimation();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  useEffect(() => {
    if (isHeaderInView) {
      controls.start('visible');
    }
  }, [controls, isHeaderInView]);

  // Fetch products based on filters and search
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response: ProductsResponse;
      
      
      if (searchQuery) {
        response = await searchProducts(searchQuery);
      }
      else {
        response = await getAllProducts();
      }

      // Check if the request was successful and data exists
      if (response.success && response.data?.products) {
        setProducts(response.data.products);
      } else {
        throw new Error('Failed to load products: Invalid response structure');
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [searchQuery]);



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
          className="text-center mb-12"
        >
       
        <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">Collections</h1>
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-0.5 bg-amber-700"></div>
            <div className="w-3 h-3 mx-2 rounded-full bg-amber-700"></div>
            <div className="w-16 h-0.5 bg-amber-700"></div>
          </div>
        </motion.div>

        {/* Search and Filter Row */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-stone-300 rounded-md w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Search products"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" aria-hidden="true" />
          </div>
          
          {/* Filter toggle button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="flex items-center px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-md transition"
              type="button"
              aria-expanded={filtersVisible}
              aria-controls="filter-panel"
            >
              
            </button>
            

          </div>
        </div>

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
           
              </motion.div>
            )}
          </AnimatePresence>

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
                  onClick={() => window.location.reload()}
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
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/products/${product.id}`} passHref>
                      <div className="block">
                        <div className="relative" style={{ height: '300px' }}>
                          <img 
                            src={product.images[0] || '/placeholder-product.jpg'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.isPublished && (
                            <div className="absolute top-3 right-3 bg-amber-700 text-white text-xs px-2 py-1 rounded">
                              Featured
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-stone-800">{product.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-stone-500">{product.tribe.name}</span>
                            <span className="mx-2 text-stone-300">•</span>
                            <span className="text-sm text-stone-500">{product.category.name}</span>
                          </div>
                          <div className="flex items-center mt-3">
                            <MapPin size={16} className="text-amber-700 mr-1" aria-hidden="true" />
                            <span className="text-sm text-stone-600">{product.tribe.region}</span>
                          </div>
                          <div className="mt-3 font-bold text-amber-800">
                            ${product.price}
                          </div>
                          <button
                            className="mt-3 flex items-center text-amber-700 hover:text-amber-800 text-sm font-medium"
                            type="button"
                          >
                            <Info size={14} className="mr-1" aria-hidden="true" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-lg">
                <Layers className="mx-auto h-12 w-12 text-stone-300" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-medium text-stone-700">No products found</h3>
                <p className="mt-2 text-stone-500">Try adjusting your filters or search terms</p>
               
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}