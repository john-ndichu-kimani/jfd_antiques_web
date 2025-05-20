"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function CartPage() {
  const { user, isAuthenticated, isLoading, removeFromCart, updateCartItemQuantity } = useAuth();
  const router = useRouter();
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(10); // Fixed shipping cost
  const [total, setTotal] = useState(0);

  // Calculate cart totals
  useEffect(() => {
    if (user?.cartItems) {
      const newSubtotal = user.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 
        0
      );
      const newTax = newSubtotal * 0.07; // Assuming 7% tax
      
      setSubtotal(newSubtotal);
      setTax(newTax);
      setTotal(newSubtotal + newTax + shipping);
    }
  }, [user?.cartItems, shipping]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to a checkout page
    alert('Redirecting to checkout...');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-stone-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-x-8">
          {/* Cart items */}
          <div className="lg:flex-1">
            <h1 className="text-2xl font-semibold text-stone-900 mb-6">Shopping Cart</h1>
            
            {!isAuthenticated ? (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-stone-600 text-center">Please sign in to view your cart.</p>
                <div className="mt-4 flex justify-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            ) : user?.cartItems?.length === 0 ? (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-stone-600 text-center">Your cart is empty.</p>
                <div className="mt-4 flex justify-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <ul className="divide-y divide-stone-200">
                  {user?.cartItems?.map((item) => (
                    <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden">
                        <Image
                          src={item.image || '/api/placeholder/100/100'}
                          alt={item.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between sm:ml-6 mt-4 sm:mt-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-stone-900">{item.name}</h3>
                            <p className="text-lg font-medium text-stone-900">${item.price.toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-stone-500">Item #{item.id}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-stone-300 rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-2 text-stone-500 hover:text-stone-700"
                              disabled={item.quantity <= 1}
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <span className="px-4 py-1 text-stone-700">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-2 text-stone-500 hover:text-stone-700"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-stone-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-sm text-stone-500">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500 mt-2">
                    <p>Tax</p>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500 mt-2">
                    <p>Shipping</p>
                    <p>${shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-stone-900 mt-4 pt-4 border-t border-stone-200">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Link
                      href="/shop"
                      className="text-sm text-amber-600 hover:text-amber-500"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Order summary */}
          { (
            <div className="mt-8 lg:mt-0 lg:w-80">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-stone-900">Order Summary</h2>
                <dl className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm text-stone-600">
                    <dt>Subtotal</dt>
                    <dd>${subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between text-sm text-stone-600">
                    <dt>Tax</dt>
                    <dd>${tax.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between text-sm text-stone-600">
                    <dt>Shipping</dt>
                    <dd>${shipping.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between text-base font-medium text-stone-900 pt-3 border-t border-stone-200">
                    <dt>Total</dt>
                    <dd>${total.toFixed(2)}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}