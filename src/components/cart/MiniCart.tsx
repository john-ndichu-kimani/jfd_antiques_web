import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import { useCartActions } from '@/hooks/useCartActions';

export const MiniCart: React.FC = () => {
  const { cart } = useCart();
  const { removeFromCart } = useCartActions();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart button with item count */}
      <button 
        className="flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View cart"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        {itemCount > 0 && (
          <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {itemCount}
          </span>
        )}
      </button>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-xl z-10">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">Your Cart</h3>
            
            {(!cart || cart.items.length === 0) ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="max-h-72 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex py-2 border-b">
                      {/* Product image */}
                      <div className="w-12 h-12 bg-gray-200 rounded mr-3">
                        {item.product.images && (
                          <img 
                            src={item.product.images[0].url} 
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        )}
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-grow">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} × ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Remove button */}
                      <button 
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Cart summary */}
                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">${Number(cart.total).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link 
                      href="/cart"
                      className="block text-center w-1/2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      View Cart
                    </Link>
                    <Link 
                      href="/checkout"
                      className="block text-center w-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};