import { Hero } from '@/components/sections/Hero';
import { FeaturedCollections } from '@/components/sections/FeaturedCollections';
import { FeaturedArtifacts } from '@/components/sections/FeaturedArtifacts';
import { CulturalContext } from '@/components/sections/CulturalContext';
import { Provenance } from '@/components/sections/Provenance';
import { Newsletter } from '@/components/sections/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCollections />
      <FeaturedArtifacts />
      <CulturalContext />
      <Provenance />
      <Newsletter />
    </main>
  );
}