import { Artifact } from '@/models/Artifact';

export const featuredArtifacts: Artifact[] = [
  {
    id: 101,
    name: 'Luba Royal Stool',
    tribe: 'Luba',
    price: 4800,
    description:
      'A ceremonial stool used by Luba royalty, intricately carved with ancestral figures and cultural symbols. Collected circa 1992.',
    age: 'Approx. 80-100 years old',
    material: 'Hardwood with natural patina',
    dimensions: '45cm × 30cm × 35cm',
    image: '/images/featured_artifacts/luba_stool.jpg',
    images: ['/api/placeholder/500/500', '/api/placeholder/500/500', '/api/placeholder/500/500'],
  },
  {
    id: 102,
    name: 'Lega Mask',
    tribe: 'Lega',
    price: 3200,
    description:
      'A traditional initiation mask from the Bwami society, representing ancestral wisdom and guidance.',
    age: 'Approx. 60-70 years old',
    material: 'Wood with kaolin clay patina',
    dimensions: '25cm × 15cm × 8cm',
    image: '/images/featured_artifacts/lega_mask.jpg',
    images: ['/api/placeholder/500/500', '/api/placeholder/500/500', '/api/placeholder/500/500'],
  },
  {
    id: 103,
    name: 'Hemba Ancestor Figure',
    tribe: 'Hemba',
    price: 5600,
    description:
      'A powerful representation of a revered ancestor, carved with traditional Hemba stylistic elements featuring a serene expression and elaborate headdress.',
    age: 'Approx. 70-90 years old',
    material: 'Hardwood with ceremonial oils',
    dimensions: '58cm × 22cm × 18cm',
    image: '/images/featured_artifacts/hemba_historical_figure.jpg',
    images: ['/api/placeholder/500/500', '/api/placeholder/500/500', '/api/placeholder/500/500'],
  },
];