import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useCartActions } from '../../hooks/useCartActions';
import Link from 'next/link';

export const CartComponent: React.FC = () => {
  const { cart, error } = useCart();
  const { updateQuantity, removeFromCart, clearCart } = useCartActions();

 

 

  // Handle quantity changes with proper validation
  const handleQuantityDecrease = async (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      await updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleQuantityIncrease = async (itemId: string, currentQuantity: number, maxStock: number) => {
    if (currentQuantity < maxStock) {
      await updateQuantity(itemId, currentQuantity + 1);
    }
  };

  const handleQuantityInputChange = async (itemId: string, newQuantity: number, maxStock: number) => {
    const validQuantity = Math.max(1, Math.min(maxStock, newQuantity));
    if (validQuantity !== newQuantity) {
      // If the input was invalid, we'll update with the corrected value
      await updateQuantity(itemId, validQuantity);
    } else {
      await updateQuantity(itemId, validQuantity);
    }
  };

  // Handle item removal with confirmation
  const handleRemoveItem = async (itemId: string) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      await removeFromCart(itemId);
    }
  };

  // Handle clear cart with confirmation
  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      await clearCart();
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <div className="text-red-800">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
        </div>
        <Link
          href={'/collections'}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Product image */}
              <div className="flex-shrink-0">
                {item.product.images && item.product.images.length > 0 ? (
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.jpg';
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-gray-600">
                  ${Number(item.price || 0).toFixed(2)} each
                </p>
                {item.product.stockQuantity && (
                  <p className="text-sm text-gray-500">
                    {item.product.stockQuantity} in stock
                  </p>
                )}
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleQuantityDecrease(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 border border-stone-300 rounded-l-md bg-stone-50 text-stone-700 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={item.product.stockQuantity || 999}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || 1;
                      handleQuantityInputChange(item.id, newQuantity, item.product.stockQuantity || 999);
                    }}
                    className="w-16 text-center py-1 border-t border-b border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityIncrease(item.id, item.quantity, item.product.stockQuantity || 999)}
                    disabled={item.quantity >= (item.product.stockQuantity || 999)}
                    className="px-3 py-1 border border-stone-300 rounded-r-md bg-stone-50 text-stone-700 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Item total */}
              <div className="text-right">
                <p className="font-semibold">
                  ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={handleClearCart}
            className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
          >
            Clear Cart
          </button>
          
          <div className="text-right">
            <p className="text-xl font-bold mb-2">
              Total: ${Number(cart.total || 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              {cart.items.reduce((total, item) => total + item.quantity, 0)} item(s)
            </p>
            <Link
              href={'/checkout'}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};