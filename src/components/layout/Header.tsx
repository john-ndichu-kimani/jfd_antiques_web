"use client"

import { useState } from 'react';
import { Menu, Search, User, ShoppingCart } from 'lucide-react';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { useScrollPosition } from '@/hooks/useScrollPosition';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScrollPosition();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-stone-900 ${
          scrolled ? 'bg-stone-900/90 backdrop-blur-sm shadow-sm' : 'bg-stone-900'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Top section with logo and utility icons */}
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu button (left) */}
            <div className="lg:hidden flex items-center">
              <button
                className="text-stone-200"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
            
            <div className="hidden lg:flex items-center space-x-5">
              <button className="text-stone-200 hover:text-amber-100 transition-colors">
                <Search size={20} />
              </button>
              <button className="text-stone-200 hover:text-amber-00 transition-colors">
                <User size={20} />
              </button>
            </div>
            
            {/* Logo (centered) */}
            <a href="/" className="flex flex-col items-center mx-auto">
              <div className="text-amber-100 font-bold text-2xl flex items-center">
                <span className="mr-1">JFD</span>
                <span className="relative">
                  <span className="absolute -top-1 left-0 w-full h-0.5 bg-amber-100"></span>
                  Collections
                </span>
              </div>
              <span className="text-amber-100 text-sm mt-0.5">African Antiques</span>
            </a>
            
            {/* Right utility icon (cart) */}
            <div className="flex items-center">
              <button className="relative text-stone-100 hover:text-amber-800 transition-colors">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
          
          {/* Navigation links below the logo */}
          <div className="hidden lg:block border-t border-stone-800">
            <Navigation />
          </div>
        </div>
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="h-32"></div>
    </>
  );
};