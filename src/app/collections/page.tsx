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
  price:number;
  period: string;
  dimensions:string;
  material:string;
  description: string;
  image: string;
  images: string[];
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
    id: 3,
    title: "Necklace",
    tribe: "Maasai",
    region: "Kenya",
    category: "Jewelry",
     price:100,
     material: "Wood, Kaolin, Patina",
    period: "Late 20th Century",
     dimensions: "24 x 12 x 12 cm	",
    description: "Traditional beaded necklace with distinctive color pattern representing status within the community.",
    image: "/images/antiques/maasai_neckless.jpg",
    images: ["/images/antiques/figure1.jpg", "/images/antiques/figure2.jpg"],
    featured: false
  },
 
  
    {
      id: 104,
      title: "Lega Ancestor Figure",
      tribe: "Lega",
      price: 300,
      description: "Sakimatwematwe, Lega. Each head with holes for the eyes and he mouth, medium heavy wood,Traditional black patina and kaolin remnants on face. ",
      material: "Wood, Kaolin, Patina",
      dimensions: "24 x 12 x 12 cm	",
      image: "/images/antiques/figure1.jpg",
      images: ["/images/antiques/figure1.jpg", "/images/antiques/figure2.jpg"],
      featured: false,
      region: 'Democratic Republic of Congo',
      category: 'Figures',
      period: ''
    },
    {
      id: 105,
      title: "Shankadi head rest ",
      tribe: "Luba",
      price: 700,
      description: "Follower of the famous Luba Shankadi head rest master artist. Heavy wood, quality carving, Nice patina.   ",
      material: "Wood, Kaolin, Patina",
      dimensions: "15 x 12 x 10 cm",
      image: "/images/antiques/131_1.jpg",
      images: ["/images/antiques/131_1.jpg", "/images/antiques/131_2.jpg"],
      featured: false,
      region: 'Democratic Republic of Congo',
      category: '',
      period: ''
    },
  
    {
      id: 106,
      title: "Passport Mask Luba ",
      tribe: "Luba",
      price: 150,
      description: "Nice little passport mask Luba, medium heavy wood, remnants of kaolin, quality carving, signs of usage. ",
      material: "Wood, Kaolin",
      dimensions: "9 x 9 x 3 cm",
      image: "/images/antiques/54_1.jpg",
      images: ["/images/antiques/54_1.jpg", "/images/antiques/54_2.jpg", "/images/antiques/54_3.jpg"],
      featured: false,
      region: 'Democratic Republic of Congo',
      category: 'Masks',
      period: ''
    },
   {
     id: 107,
     title: "Old Luba whistle ",
     tribe: "Luba",
     price: 80,
     description: "Old little Luba whistle, dark wood, the carvings worn out by usage.",
     material: "Wood",
     dimensions: "10 x 3 x 2.5 cm		",
     image: "/images/antiques/358_1.jpg",
     images: ["/images/antiques/358_1.jpg", "/images/antiques/358_3.jpg"],
     featured: false,
     region: 'Democratic Republic of Congo',
     category: '',
     period: ''
   },
     {
       id: 108,
       title: "Little Luba whistle",
       tribe: "Luba",
       price: 90,
       description: "little Luba whistle, heavy wood, worn traditional patina over dark wood, obvious signs of age and usage.",
       material: "patina over dark wood",
       dimensions: "10 x 5 x 3.5 cm		",
       image: "/images/antiques/359_1.jpg",
       images: ["/images/antiques/359_1.jpg", "/images/antiques/359_3.jpg", "/images/antiques/359_4.jpg"],
       featured: false,
       region: 'Democratic Republic of Congo',
       category: '',
       period: ''
     },

       {
         id: 109,
         title: "Old lega spoon",
         tribe: "Lega",
         price: 200,
         description: "Old lega spoon, bone and vegetal rope, age and usage obvious.",
         material: "bone, vegetable rope",
         dimensions: "14 x 4.5 x 1 cm",
         image: "/images/antiques/82_1.jpg",
         images: ["/images/antiques/82_2.jpg", "/images/antiques/82_2.jpg"],
         featured: false,
         region: 'Democratic Republic of Congo',
         category: '',
         period: ''
       },
       {
         id: 110,
         title: "Small lega female figure",
         tribe: "Lega",
         price: 300,
         description: "Small lega female figure. Known model, Heavy dark wood with traditional black patina, nail tacks for the eyes. Comes with beads tied to the foot.  Signs of age",
         material: "Dark Wood , Black Patina, Nail Tacks",
         dimensions: "25 x 6.5 x 5 cm",
         image: "/images/antiques/94_1.jpg",
         images: ["/images/antiques/94_1.jpg", "/images/antiques/94_2.jpg"],
         featured: false,
         region: 'Democratic Republic of Congo',
         category: '',
         period: ''
       },
        {
          id: 111,
          title: "Kakudji Luba female half figure",
          tribe: "Luba",
          price: 90,
          description: "Kakudji Luba female half figure, heavy wood , a long slot in the back revealing age. Big hole at the top.  Worn traditional patina.",
          material: "Heavy Wood , Black Patina",
          dimensions: "13 x 4 x 4 cm	",
          image: "/images/antiques/305_1.jpg",
          images: ["/images/antiques/305_1.jpg", "/images/antiques/305_2.jpg"],
          featured: false,
          region: 'Democratic Republic of Congo',
          category: '',
          period: ''
        },
         {
           id: 112,
           title: "Luba whistle",
           tribe: "Luba",
           price: 90,
           description: "Luba whistle, worn traditional patina over dark wood, female face on top. Signs of usage",
           material: "Dark Wood ,Patina",
           dimensions: "14 x 3 x 2.5 cm",
           image: "/images/antiques/235_1.jpg",
           images: ["/images/antiques/235_1.jpg", "/images/antiques/235_2.jpg"],
           featured: false,
           region: 'Democratic Republic of Congo',
           category: '',
           period: ''
         },
      {
        id: 113,
        title: "Songye kifwebe masculine mask",
        tribe: "Songye kifwebe ",
        price: 750,
        description: "Songye kifwebe masculine mask, remnants of red traditional paint on the eyes and the mouth, but no trace of kaolin. A hole in the forefront and an old break in the back. Medium light wood. Quality carving. Age",
        material: "Dark Wood ,Patina",
        dimensions: "39 x 16 x 12.5 cm",
        image: "/images/antiques/317_1.jpg",
        images: ["/images/antiques/317_1.jpg", "/images/antiques/317_2.jpg"],
        featured: false,
        region: 'Democratic Republic of Congo',
        category: '',
        period: ''
      },
    {
      id: 114,
      title: "Zande doll",
      tribe: "Zande",
      price: 120,
      description: "Zande doll, heavy wood, raffia rope.",
      material: "Heavy Wood , Raffia",
      dimensions: "22 x 9 x 7 cm",
      image: "/images/antiques/317_1.jpg",
      images: ["/images/antiques/317_1.jpg", "/images/antiques/317_2.jpg"],
      featured: false,
      region: 'Democratic Republic of Congo',
      category: '',
      period: ''
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
                    <div className="relative " style={{height:'70vh'}}>
                      <img 
                        src={item.image} 
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
                     <Link href={`/artifacts/${item.id}`}>

        <button
          className="mt-3 flex items-center text-amber-700 hover:text-amber-800 text-sm font-medium"
          type="button"
        >
          <Info size={14} className="mr-1" aria-hidden="true" />
          View Details
        </button>
        </Link>
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

    
    
    </main>
  );
}