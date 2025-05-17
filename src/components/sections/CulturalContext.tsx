import { HeritageSection } from '../common/HeritageSection';
import { heritageSections } from '@/lib/data/heritage';

export const CulturalContext: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h5 className="text-amber-800 font-medium mb-2">Cultural Context</h5>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
            Understanding African Heritage
          </h2>
          <div className="w-24 h-1 bg-amber-800 mx-auto mt-4"></div>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Explore the rich cultural traditions and historical significance behind the artifacts in our
            collection.
          </p>
        </div>
        <div className="space-y-24">
          {heritageSections.map((section, index) => (
            <HeritageSection key={section.title} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};