import { Collection } from '@/models/Collection';

export const collections: Collection[] = [
 
  {
    id: 1,
    name: 'Masks',
    description: 'Traditional masks and figures from the Lega culture of eastern Congo',
    items: 8,
    href:"Masks",
    image: '/images/antiques/mask1.jpg',
    featured: true,
  },
  {
    id: 2,
    name: 'Figures',
    description: 'Sculptures and ceremonial items from the Hemba people',
    items: 10,
    href:"Figures",
    image: '/images/antiques/figure1.jpg',
    featured: false,
  },
 
  
];