import { NavigationItem } from '@/models/Navigation';

export const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Collections',
    href: '/collections',
    children: [
      { name: 'Masks', href: 'Masks' },
      { name: 'Figures', href: 'Figures' },
      { name: 'Other', href: '/collections' },
    ],
  },
  // { name: 'Featured Artifacts', href: '/artifacts' },
  { name: 'Our Story', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
 
  { name: 'Contact', href: '/contact' },
];