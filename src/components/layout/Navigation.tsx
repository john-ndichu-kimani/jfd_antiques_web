'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { NavigationItem } from '@/models/Navigation';
import { navigation } from '@/lib/data/navigation';


export const Navigation: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleHover = (name: string) => {
    setOpenDropdown(name);
  };

  const handleLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="py-3">
      <ul className="flex justify-center space-x-10">
        {navigation.map((item: NavigationItem) => (
          <li key={item.name} className="relative group">
            {/* Handle items with children (dropdowns) */}
            {item.children ? (
              <div
                className="relative"
                onMouseEnter={() => handleHover(item.name)}
                onMouseLeave={handleLeave}
              >
                <Link
                  href={item.href}
                  className="text-stone-200 hover:text-amber-500 transition-colors flex items-center pb-1"
                >
                  {item.name}
                  <ChevronDown size={16} className="ml-1" />
                </Link>

                {/* Dropdown menu */}
                {openDropdown === item.name && (
                  <div className="absolute z-10 mt-1 w-48 bg-stone-900 rounded-md shadow-lg py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={
                          // Special handling for category links
                          child.name === 'Masks' || child.name === 'Figures'
                            ? `/collections?category=${encodeURIComponent(child.name)}`
                            : child.href
                        }
                        className="block px-4 py-2 text-sm text-stone-300 hover:bg-stone-800 hover:text-amber-500"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Regular navigation items without children
              <Link
                href={item.href}
                className="text-stone-200 hover:text-amber-500 transition-colors pb-1"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};