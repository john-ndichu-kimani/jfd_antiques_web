'use client';

import React from 'react';
import { CartProvider } from '../../contexts/CartContext';
import { CartComponent } from '../../components/cart/CartComponent';

export default function CartPage() {
  return (
    <CartProvider>
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <CartComponent />
      </div>
    </CartProvider>
  );
}