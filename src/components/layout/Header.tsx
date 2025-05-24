"use client"

import { useState } from 'react';
import { Menu, User, ShoppingCart } from 'lucide-react';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { MiniCart } from '../cart/MiniCart';


export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScrollPosition();
  const { user, isAuthenticated } = useAuth(); // Get auth status

  function logout(): void {
    throw new Error('Function not implemented.');
  }

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
              {/* Profile icon with dropdown functionality */}
              <div className="relative">
                <button className="text-stone-200 hover:text-amber-100 transition-colors">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-stone-800 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  {isAuthenticated ? (
                    <>
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-stone-200 hover:bg-stone-700"
                      >
                        My Profile
                      </Link>
                      <button 
                        onClick={() => logout()} 
                        className="block w-full text-left px-4 py-2 text-sm text-stone-200 hover:bg-stone-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login" 
                        className="block px-4 py-2 text-sm text-stone-200 hover:bg-stone-700"
                      >
                        Sign In
                      </Link>
                      <Link 
                        href="/register" 
                        className="block px-4 py-2 text-sm text-stone-200 hover:bg-stone-700"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Logo (centered) */}
            <Link href="/" className="flex flex-col items-center mx-auto">
              <div className="text-amber-500 font-bold text-3xl sm:text-2xl flex items-center">
                <span className="mr-1">JFD Collection African Antiques</span>
              </div>
            </Link>
            
            {/* Right utility icon (cart) */}
            <div className="flex items-center">
                {/* Mini Cart */}
            <div className="self-start">
              <MiniCart />
            </div>
            </div>
          </div>
          
          {/* Navigation links below the logo */}
          <div className="hidden lg:block border-t border-stone-800">
            <Navigation />
          </div>
        </div>
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="h-40 bg-stone-900"></div>
    </>
  );
};