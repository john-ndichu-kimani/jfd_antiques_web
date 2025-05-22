'use client';
import { use } from 'react';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShoppingCart, Heart, Share2, Info, MapPin, Truck } from 'lucide-react';
import { getProductById } from '@/lib/services/product_service';
import { Product, ProductResponse } from '@/types/product';
import { useCartActions } from '@/hooks/useCartActions';
import { MiniCart } from '@/components/cart/MiniCart';

export default function ProductDetailPage({ params }:  {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Helper function to convert string price to number
const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  // Remove any currency symbols and parse as float
  const cleanPrice = price.replace(/[^\d.-]/g, '');
  return parseFloat(cleanPrice) || 0;
};
  
  // Get the unwrapped params.id using React.use()
  const { id } = use(params) as { id: string };
  const { isLoading, addToCart } = useCartActions({ product: product || undefined });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response: ProductResponse = await getProductById(id);
        
        if (response.success && response.data?.product) {
          setProduct(response.data.product);
        } else {
          throw new Error('Failed to load product details: Invalid response structure');
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(quantity);
    }
  };

  // Helper function to get image URL
  const getImageUrl = (index: number): string => {
    if (product?.images && product.images[index]) {
      return product.images[index].url;
    }
    return '/placeholder-product.jpg';
  };

  // Helper function to get main image
  const getMainImageIndex = (): number => {
    if (product?.images) {
      const mainImageIndex = product.images.findIndex(img => img.isMain);
      return mainImageIndex !== -1 ? mainImageIndex : 0;
    }
    return 0;
  };

  // Set main image as selected when product loads
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(getMainImageIndex());
    }
  }, [product]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
        <p className="ml-4 text-stone-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center py-12 bg-stone-50 rounded-lg">
          <Info className="mx-auto h-12 w-12 text-stone-300" />
          <h2 className="mt-4 text-lg font-medium text-stone-700">Error loading product</h2>
          <p className="mt-2 text-stone-500">{error || 'Product not found'}</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation and cart */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-stone-600 hover:text-amber-700 transition"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Products
          </button>
          
          <MiniCart />
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
            {/* Product gallery */}
            <div className="lg:col-span-3">
              <div className="relative rounded-lg overflow-hidden mb-4" style={{ height: '400px' }}>
                <img 
                  src={getImageUrl(selectedImage)} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail gallery if more than one image */}
              {product.images && product.images.length > 1 && (
                <div className="flex overflow-x-auto space-x-2 pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                        selectedImage === index ? 'border-amber-600' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image.url} 
                        alt={image.altText || `${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product details */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-2">
                <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  {product.category.name}
                </span>
                {product.isFeatured && (
                  <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Featured
                  </span>
                )}
                {product.isAntique && (
                  <span className="ml-2 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    Antique
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-stone-800 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <MapPin size={16} className="text-amber-700 mr-1" />
                <span className="text-stone-600">
                  Made by {product.tribe.name} from {product.tribe.region}, {product.tribe.country}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-amber-700 mb-6">
                ${typeof product.price === 'string' ? product.price : product.price}
              </div>
              
              <div className="bg-stone-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-stone-600">{product.description}</p>
              </div>

              {/* Product details section */}
              <div className="bg-stone-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-3">Product Details</h3>
                <div className="space-y-2 text-sm">
                  {product.origin && (
                    <div className="flex justify-between">
                      <span className="text-stone-600">Origin:</span>
                      <span className="text-stone-800">{product.origin}</span>
                    </div>
                  )}
                  {product.materials && (
                    <div className="flex justify-between">
                      <span className="text-stone-600">Materials:</span>
                      <span className="text-stone-800">{product.materials}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-stone-600">Dimensions:</span>
                      <span className="text-stone-800">{product.dimensions}</span>
                    </div>
                  )}
                  {product.condition && (
                    <div className="flex justify-between">
                      <span className="text-stone-600">Condition:</span>
                      <span className="text-stone-800">{product.condition}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Truck size={16} className="text-stone-600 mr-1" />
                  <span className="text-stone-600 text-sm">
                    {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              {/* Quantity selector */}
              {product.stockQuantity > 0 && (
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-stone-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-3 py-1 border border-stone-300 rounded-l-md bg-stone-50 text-stone-700 hover:bg-stone-100 disabled:opacity-50"
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max={product.stockQuantity}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockQuantity, parseInt(e.target.value) || 1)))}
                      className="w-16 text-center py-1 border-t border-b border-stone-300 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      disabled={quantity >= product.stockQuantity}
                      className="px-3 py-1 border border-stone-300 rounded-r-md bg-stone-50 text-stone-700 hover:bg-stone-100 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading || product.stockQuantity <= 0}
                  className="flex items-center justify-center px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {isLoading ? 'Adding to Cart...' : product.stockQuantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                
                <div className="flex space-x-3">
                  {/* <button className="flex-1 flex items-center justify-center px-4 py-2 border border-stone-300 rounded-md hover:bg-stone-50 transition">
                    <Heart size={18} className="mr-2 text-stone-600" />
                    Wishlist
                  </button>
                  <button className="flex-1 flex items-center justify-center px-4 py-2 border border-stone-300 rounded-md hover:bg-stone-50 transition">
                    <Share2 size={18} className="mr-2 text-stone-600" />
                    Share
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}