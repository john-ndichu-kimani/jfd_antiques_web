'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import Link from 'next/link';
import { Product } from '@/types/product';
import { getFeaturedProducts } from '@/lib/services/product_service';
import { ProductCard } from '../common/ArtifactCard';


export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getFeaturedProducts();
        setProducts(response.data.products); 
        setLoading(false);
      } catch (err) {
        setError('Failed to load featured products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h5 className="text-amber-800 font-medium mb-2">Featured Collections</h5>
            <h2 className="text-3xl font-bold text-stone-800">Exceptional Pieces</h2>
            <p className="mt-2 text-stone-600 max-w-xl">
              Highlighting our most significant pieces with unique historical and cultural importance.
            </p>
          </div>
          <Link href="/collections">
            <Button className="mt-4 md:mt-0">
              View All Collections <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-stone-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => console.log(`Selected product: ${product.name}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};