import React from 'react';
import Link from 'next/link';
import { Info, MapPin, ShoppingCart } from 'lucide-react';
import { Product, ProductResponse } from '@/types/product';
import { useCartActions } from '@/hooks/useCartActions';

interface ProductCardProps {
  product: Product;
}

const getMainImageUrl = (product: Product): string => {
  if (!product.images || product.images.length === 0) {
    return '/placeholder-product.jpg';
  }
  
  // Find the main image or fall back to the first image
  const mainImage = product.images.find(img => img.isMain) || product.images[0];
  return mainImage.url;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isLoading, addToCart } = useCartActions({ product });

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event propagation
    await addToCart(1);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="block">
        <Link href={`/collections/${product.id}`} passHref>
          <div className="relative" style={{ }}>
            <img 
              src={getMainImageUrl(product) }
              alt={product.name}
              className="w-full h-[100%] object-cover"
            />
            {product.isPublished && (
              <div className="absolute top-3 right-3 bg-amber-700 text-white text-xs px-2 py-1 rounded">
                Featured
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-4">
          <Link href={`/collections/${product.id}`} passHref>
            <div>
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
            </div>
          </Link>
          
          {/* Action buttons */}
          <div className="mt-4 flex items-center space-x-2">
            <Link 
              href={`/collections/${product.id}`} 
              passHref
              className="flex-1 flex items-center justify-center px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition text-sm font-medium"
            >
              <Info size={14} className="mr-1" aria-hidden="true" />
              View Details
            </Link>
            
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-md transition text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Add to Cart"
            >
              <ShoppingCart size={14} className="mr-1" aria-hidden="true" />
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;