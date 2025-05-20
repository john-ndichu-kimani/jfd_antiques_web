import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { Provenance } from "@/components/sections/Provenance";
import { Newsletter } from "@/components/sections/Newsletter";
import Hero from "@/components/sections/Hero";
import CulturalContext from "@/components/sections/CulturalContext";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCollections />
      <FeaturedProducts />
      <CulturalContext />
      <Provenance />
      <Newsletter />
    </main>
  );
}
