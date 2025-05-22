import React, { useState } from 'react';
import { Product } from '../../lib/services/cart_services';
import { useCartActions } from '../../hooks/useCartActions';

interface AddToCartButtonProps {
  product: Product;
  buttonText?: string;
  className?: string;
  showQuantity?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  buttonText = 'Add to Cart',
  className = '',
  showQuantity = true,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { isLoading, error, addToCart } = useCartActions({ product });
  const [success, setSuccess] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(quantity);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const baseButtonClasses = 'px-4 py-2 rounded-md text-white transition-colors';
  const buttonClasses = `${baseButtonClasses} ${className || 'bg-blue-600 hover:bg-blue-700'} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`;

  return (
    <div>
      {showQuantity && (
        <div className="flex items-center mb-2">
          <span className="mr-2">Quantity:</span>
          <div className="flex border rounded-md">
            <button
              className="px-3 py-1 border-r"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isLoading}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              className="px-3 py-1 border-l"
              onClick={() => setQuantity(quantity + 1)}
              disabled={isLoading}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}
      
      <button
        className={buttonClasses}
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : buttonText}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-500">{error}</div>
      )}
      
      {success && (
        <div className="mt-2 text-sm text-green-500">
          Added to cart successfully!
        </div>
      )}
    </div>
  );
};