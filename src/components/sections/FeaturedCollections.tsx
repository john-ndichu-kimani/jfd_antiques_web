import { CollectionCard } from '../common/CollectionCard';
import { collections } from '@/lib/data/collections';

export const FeaturedCollections: React.FC = () => {
  return (
    <section className="py-16 md:py-24 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
            Categories
          </h2>
          <div className="w-24 h-1 bg-amber-800 mx-auto mt-4"></div>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Explore our diverse collections organized by tribal origins, each with their unique
            artistic traditions, cultural significance, and historical context.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
};