import { Provenance } from "@/components/sections/Provenance";
import { Newsletter } from "@/components/sections/Newsletter";
import Hero from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FeaturedCategories } from '@/components/categories/FeaturedCategories';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Provenance />
      <Newsletter />
    </main>
  );
}
