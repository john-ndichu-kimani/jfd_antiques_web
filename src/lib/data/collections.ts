import { Collection } from '@/models/Collection';

export const collections: Collection[] = [
  {
    id: 1,
    name: 'Luba',
    description: 'Artifacts from the Luba people of southeastern Democratic Republic of Congo',
    items: 12,
    image: '/images/collection_categories/luba.jpg',
    featured: true,
  },
  {
    id: 2,
    name: 'Lega',
    description: 'Traditional masks and figures from the Lega culture of eastern Congo',
    items: 8,
    image: '/images/collection_categories/lega.jpg',
    featured: true,
  },
  {
    id: 3,
    name: 'Hemba',
    description: 'Sculptures and ceremonial items from the Hemba people',
    items: 10,
    image: '/images/collection_categories/sculptures.jpg',
    featured: false,
  },
  {
    id: 4,
    name: 'Mixed Tribal Heritage',
    description: 'Various artifacts from different tribes across Democratic Republic of Congo',
    items: 15,
    image: '/images/collection_categories/various_artifacts.jpg',
    featured: false,
  },
];