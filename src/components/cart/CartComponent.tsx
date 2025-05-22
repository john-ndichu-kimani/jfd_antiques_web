// src/components/cart/CartComponent.tsx
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useCartActions } from '../../hooks/useCartActions';

export const CartComponent: React.FC = () => {
  const { cart, loading, error } = useCart();
  const { isLoading, updateQuantity, removeFromCart, clearCart } = useCartActions();
  
  if (loading || isLoading) {
    return <div className="p-4 text-center">Loading cart...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  }
  
  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => window.location.href = '/collections'}
        >
          Shop Now
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      
      {cart.items.map((item) => (
        <div key={item.id} className="flex items-center py-4 border-b">
          {/* Product image */}
          <div className="w-20 h-20 mr-4 bg-gray-200 rounded-md overflow-hidden">
            {item.product.imageUrl && (
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {/* Product info */}
          <div className="flex-grow">
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-gray-500 text-sm">
              ${Number(item.price).toFixed(2)} each
            </p>
          </div>
          
          {/* Quantity controls */}
          <div className="flex items-center">
            <button
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              aria-label="Decrease quantity"
            >
              -
            </button>
            
            <span className="mx-3">{item.quantity}</span>
            
            <button
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          {/* Item total */}
          <div className="ml-6 text-right">
            <div className="font-semibold">
              ${(Number(item.price) * item.quantity).toFixed(2)}
            </div>
            
            <button
              className="text-red-500 text-sm mt-1"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      
      {/* Cart summary */}
      <div className="mt-6 flex justify-between items-center">
        <button
          className="text-red-500"
          onClick={() => clearCart()}
        >
          Clear Cart
        </button>
        
        <div className="text-right">
          <div className="text-lg font-semibold">
            Total: ${Number(cart.total).toFixed(2)}
          </div>
          <button
            className="mt-3 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={() => window.location.href = '/checkout'}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};