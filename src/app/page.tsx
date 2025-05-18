import { FeaturedCollections } from '@/components/sections/FeaturedCollections';
import { FeaturedArtifacts } from '@/components/sections/FeaturedArtifacts';
import { Provenance } from '@/components/sections/Provenance';
import { Newsletter } from '@/components/sections/Newsletter';
import Hero from '@/components/sections/Hero';
import CulturalContext from '@/components/sections/CulturalContext';

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