import { NavigationItem } from '@/models/Navigation';

export const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Collections',
    href: '/collections',
    children: [
      { name: 'Luba', href: '#' },
      { name: 'Lega', href: '#' },
      { name: 'Hemba', href: '#' },
      { name: 'Mixed Tribal', href: '#' },
      { name: 'View All', href: '/collections' },
    ],
  },
  { name: 'Featured Artifacts', href: '/artifacts' },
  { name: 'Our Story', href: '/about' },
 
  { name: 'Contact', href: '#' },
];