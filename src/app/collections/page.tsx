'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Filter, X, ChevronDown, Info, Layers, MapPin, Search } from 'lucide-react';

// Define TypeScript interfaces
interface Item {
  id: number;
  title: string;
  tribe: string;
  region: string;
  category: string;
  period: string;
  description: string;
  imageUrl: string;
  featured: boolean;
}

interface FilterState {
  tribe: string[];
  region: string[];
  category: string[];
  period: string[];
}

interface FilterSectionProps {
  title: string;
  options: string[];
  type: keyof FilterState;
  toggleFilter: (type: keyof FilterState, value: string) => void;
  isFilterActive: (type: keyof FilterState, value: string) => boolean;
}

interface ItemDetailViewProps {
  item: Item;
  onClose: () => void;
}

// Sample gallery data - in a real application, this would come from your CMS or API
const galleryItems: Item[] = [
  {
    id: 1,
    title: "Lega Mask",
    tribe: "Lega",
    region: "Eastern Congo",
    category: "Masks",
    period: "Mid 20th Century",
    description: "A ceremonial heart-shaped mask used in Bwami society rituals, featuring characteristic white pigmentation and subtle facial details.",
    imageUrl: "/images/antiques/mask1.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Figure",
    tribe: "Lega",
    region: "Democratic Republic of Congo",
    category: "Figures",
    period: "Early 20th Century",
    description: "Carved wooden figure representing an important ancestor, with characteristic calm expression and hands resting on abdomen.",
    imageUrl: "/images/antiques/figure1.jpg",
    featured: true
  },
  {
    id: 3,
    title: "Necklace",
    tribe: "Maasai",
    region: "Kenya",
    category: "Jewelry",
    period: "Late 20th Century",
    description: "Traditional beaded necklace with distinctive color pattern representing status within the community.",
    imageUrl: "/images/antiques/maasai_neckless.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Spirit Mask",
    tribe: "Lega",
    region: "Democratic Republic of Congo",
    category: "Masks",
    period: "Early 20th Century",
    description: "Wooden mask representing an ancestral spirit, with intricate scarification patterns and expressive features.",
    imageUrl: "/images/antiques/mask5.jpg",
    featured: true
  },
  {
    id: 5,
    title: "Initiation Mask",
    tribe: "Lega",
    region: "Democratic Republic of Congo",
    category: "Masks",
    period: "Mid 20th Century",
    description: "White-faced mask used in coming-of-age ceremonies, representing idealized female beauty and ancestral spirits.",
    imageUrl: "/images/antiques/mask3.jpg",
    featured: true
  },
];

// Extract unique filter options
const tribes = Array.from(new Set(galleryItems.map(item => item.tribe)));
const regions = Array.from(new Set(galleryItems.map(item => item.region)));
const categories = Array.from(new Set(galleryItems.map(item => item.category)));
const periods = Array.from(new Set(galleryItems.map(item => item.period)));

export default function GalleryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // State for filtering and viewing
  const [filters, setFilters] = useState<FilterState>({
    tribe: [],
    region: [],
    category: [],
    period: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [visibleItems, setVisibleItems] = useState<Item[]>(galleryItems);

  // Animation controls
  const controls = useAnimation();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  useEffect(() => {
    if (isHeaderInView) {
      controls.start('visible');
    }
  }, [controls, isHeaderInView]);

  // Parse URL parameters on component mount and when URL changes
  useEffect(() => {
    const newFilters: FilterState = {
      tribe: [],
      region: [],
      category: [],
      period: []
    };
    
    // Extract filter values from URL parameters
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Check if the category exists in our categories list
      const decodedCategory = decodeURIComponent(categoryParam);
      if (categories.includes(decodedCategory)) {
        newFilters.category = [decodedCategory];
      }
    }
    
    const tribeParam = searchParams.get('tribe');
    if (tribeParam) {
      const decodedTribe = decodeURIComponent(tribeParam);
      if (tribes.includes(decodedTribe)) {
        newFilters.tribe = [decodedTribe];
      }
    }
    
    const regionParam = searchParams.get('region');
    if (regionParam) {
      const decodedRegion = decodeURIComponent(regionParam);
      if (regions.includes(decodedRegion)) {
        newFilters.region = [decodedRegion];
      }
    }
    
    const periodParam = searchParams.get('period');
    if (periodParam) {
      const decodedPeriod = decodeURIComponent(periodParam);
      if (periods.includes(decodedPeriod)) {
        newFilters.period = [decodedPeriod];
      }
    }
    
    // Update filter state with URL parameters
    setFilters(newFilters);
    
    // Also check for search query
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchQuery(decodeURIComponent(queryParam));
    } else {
      setSearchQuery('');
    }
    
    // Show filter panel if any filters are active
    if (Object.values(newFilters).some(arr => arr.length > 0)) {
      setFiltersVisible(true);
    }
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    // Only update URL if filters have changed after initial load
    const params = new URLSearchParams();
    
    if (filters.category.length > 0) {
      params.set('category', filters.category[0]);
    }
    
    if (filters.tribe.length > 0) {
      params.set('tribe', filters.tribe[0]);
    }
    
    if (filters.region.length > 0) {
      params.set('region', filters.region[0]);
    }
    
    if (filters.period.length > 0) {
      params.set('period', filters.period[0]);
    }
    
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    
    // Create the new URL
    const newUrl = params.toString() 
      ? `${pathname}?${params.toString()}`
      : pathname;
    
    // Update the URL without triggering a page reload
    router.replace(newUrl, { scroll: false });
  }, [filters, searchQuery, pathname, router]);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...galleryItems];
    
    // Apply each filter if it has selections
    if (filters.tribe.length > 0) {
      filtered = filtered.filter(item => filters.tribe.includes(item.tribe));
    }
    
    if (filters.region.length > 0) {
      filtered = filtered.filter(item => filters.region.includes(item.region));
    }
    
    if (filters.category.length > 0) {
      filtered = filtered.filter(item => filters.category.includes(item.category));
    }
    
    if (filters.period.length > 0) {
      filtered = filtered.filter(item => filters.period.includes(item.period));
    }
    
    // Apply search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.tribe.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    setVisibleItems(filtered);
  }, [filters, searchQuery]);

  // Toggle a filter option
  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        // Add the filter (replace current filter for now - single selection mode)
        return { ...prev, [type]: [value] };
      } else {
        // Remove the filter
        current.splice(index, 1);
        return { ...prev, [type]: current };
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      tribe: [],
      region: [],
      category: [],
      period: []
    });
    setSearchQuery('');
  };

  // Check if a filter is active
  const isFilterActive = (type: keyof FilterState, value: string) => {
    return filters[type].includes(value);
  };

  // Filter UI component
  const FilterSection = ({ title, options, type, toggleFilter, isFilterActive }: FilterSectionProps) => {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left text-stone-800 font-medium mb-2"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-expanded={isOpen}
        >
          {title}
          <ChevronDown 
            size={18} 
            className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </button>
        
        {isOpen && (
          <div className="space-y-2 pl-2">
            {options.map(option => (
              <div key={option} className="flex items-center">
                <button
                  className={`px-3 py-1 text-sm rounded-full transition ${
                    isFilterActive(type, option)
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                  onClick={() => toggleFilter(type, option)}
                  type="button"
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Detail view for selected item
  const ItemDetailView = ({ item, onClose }: ItemDetailViewProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <X size={20} className="text-stone-800" />
          </button>
          
          {/* Image section */}
          <div className="md:w-1/2 bg-stone-100">
            <div className="h-full flex items-center justify-center p-6 relative">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Content section */}
          <div className="md:w-1/2 p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold text-stone-800">{item.title}</h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <span className="w-24 text-sm text-stone-500">Tribe:</span>
                <span className="font-medium text-stone-800">{item.tribe}</span>
              </div>
              
              <div className="flex items-start">
                <span className="w-24 text-sm text-stone-500">Region:</span>
                <div className="flex items-center">
                  <MapPin size={16} className="text-amber-700 mr-2" />
                  <span className="font-medium text-stone-800">{item.region}</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="w-24 text-sm text-stone-500">Category:</span>
                <span className="font-medium text-stone-800">{item.category}</span>
              </div>
              
              <div className="flex items-start">
                <span className="w-24 text-sm text-stone-500">Period:</span>
                <span className="font-medium text-stone-800">{item.period}</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-stone-800 mb-2">About this piece</h3>
              <p className="text-stone-600">{item.description}</p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-stone-200">
              <Link href="/contact">
                <button 
                  className="px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition"
                  type="button"
                >
                  Inquire About This Piece
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

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
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">
            {filters.category.length > 0 
              ? filters.category[0]
              : "Collections"}
          </h1>
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-0.5 bg-amber-700"></div>
            <div className="w-3 h-3 mx-2 rounded-full bg-amber-700"></div>
            <div className="w-16 h-0.5 bg-amber-700"></div>
          </div>
          
      {Object.entries(filters).map(([type, values]) =>
  (values as (string | number | boolean)[]).map((value, index) => {
    const displayValue = String(value);

    
  })
)}

        </motion.div>

        {/* Search and Filter Row */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search the collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-stone-300 rounded-md w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Search the collection"
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
              <Filter size={18} className="mr-2 text-stone-700" aria-hidden="true" />
              <span className="text-stone-700">Filters</span>
              {Object.values(filters).some(arr => arr.length > 0) && (
                <span className="ml-2 w-5 h-5 bg-amber-700 rounded-full text-white text-xs flex items-center justify-center">
                  {Object.values(filters).reduce((total, arr) => total + arr.length, 0)}
                </span>
              )}
            </button>
            
            {Object.values(filters).some(arr => arr.length > 0) && (
              <button 
                onClick={clearFilters}
                className="text-amber-700 hover:text-amber-800 font-medium text-sm"
                type="button"
              >
                Clear All
              </button>
            )}
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
                
                <FilterSection 
                  title="Tribe" 
                  options={tribes} 
                  type="tribe" 
                  toggleFilter={toggleFilter} 
                  isFilterActive={isFilterActive} 
                />
                <FilterSection 
                  title="Region" 
                  options={regions} 
                  type="region" 
                  toggleFilter={toggleFilter} 
                  isFilterActive={isFilterActive} 
                />
                <FilterSection 
                  title="Category" 
                  options={categories} 
                  type="category" 
                  toggleFilter={toggleFilter} 
                  isFilterActive={isFilterActive} 
                />
                <FilterSection 
                  title="Period" 
                  options={periods} 
                  type="period" 
                  toggleFilter={toggleFilter} 
                  isFilterActive={isFilterActive} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gallery Grid */}
          <div className="flex-grow">
            {visibleItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedItem(item);
                      }
                    }}
                  >
                    <div className="relative h-80">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        style={{width:"100%",height:"100%",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}
                       
                      />
                      {item.featured && (
                        <div className="absolute top-3 right-3 bg-amber-700 text-white text-xs px-2 py-1 rounded">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-stone-800">{item.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-stone-500">{item.tribe}</span>
                        <span className="mx-2 text-stone-300">•</span>
                        <span className="text-sm text-stone-500">{item.category}</span>
                      </div>
                      <div className="flex items-center mt-3">
                        <MapPin size={16} className="text-amber-700 mr-1" aria-hidden="true" />
                        <span className="text-sm text-stone-600">{item.region}</span>
                      </div>
                      <button 
                        className="mt-3 flex items-center text-amber-700 hover:text-amber-800 text-sm font-medium"
                        type="button"
                      >
                        <Info size={14} className="mr-1" aria-hidden="true" />
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-lg">
                <Layers className="mx-auto h-12 w-12 text-stone-300" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-medium text-stone-700">No items found</h3>
                <p className="mt-2 text-stone-500">Try adjusting your filters or search terms</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition"
                  type="button"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item detail modal */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetailView 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}