
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, MapPin } from 'lucide-react';

import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(product);
    }
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSelect();
        }
      }}
    >
      <div className="relative" style={{ height: '65vh' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {product.featured && (
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
          <span className="text-sm text-stone-500">${product.price}</span>
        </div>
        <div className="flex items-center mt-3">
          <MapPin size={16} className="text-amber-700 mr-1" aria-hidden="true" />
          <span className="text-sm text-stone-600">{product.dimensions}</span>
        </div>
        <Link href={`/products/${product.id}`}>
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
  );
};