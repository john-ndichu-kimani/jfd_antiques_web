import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { ArtifactCard } from '../common/ArtifactCard';
import { featuredArtifacts } from '@/lib/data/artifacts';

export const FeaturedArtifacts: React.FC = () => {
  return (
    <section className="py-16 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h5 className="text-amber-800 font-medium mb-2">Featured Artifacts</h5>
            <h2 className="text-3xl font-bold text-stone-800">Exceptional Pieces</h2>
            <p className="mt-2 text-stone-600 max-w-xl">
              Highlighting our most significant pieces with unique historical and cultural importance.
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            View All Artifacts <ArrowRight size={16} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtifacts.map((artifact) => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      </div>
    </section>
  );
};