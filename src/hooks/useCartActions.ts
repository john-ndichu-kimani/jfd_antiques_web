// src/hooks/useCartActions.ts
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../lib/services/cart_services';

interface UseCartActionsProps {
  product?: Product;
}

interface CartActionResult {
  isLoading: boolean;
  error: string | null;
  addToCart: (quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

/**
 * A hook for cart actions with loading and error states
 */
export const useCartActions = ({ product }: UseCartActionsProps = {}): CartActionResult => {
  const { addItem, updateItem, removeItem, clearCart: clearAllItems, loading, error } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Add a product to cart
  const addToCart = async (quantity: number): Promise<void> => {
    if (!product) {
      setActionError('No product specified for add to cart');
      return;
    }
    
    try {
      setIsLoading(true);
      setActionError(null);
      await addItem(product.id, quantity, product.price);
    } catch (err) {
      setActionError('Failed to add product to cart');
      console.error('Error in addToCart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update quantity of an item in cart
  const updateQuantity = async (itemId: string, quantity: number): Promise<void> => {
    try {
      setIsLoading(true);
      setActionError(null);
      await updateItem(itemId, quantity);
    } catch (err) {
      setActionError('Failed to update cart item');
      console.error('Error in updateQuantity:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove an item from cart
  const removeFromCart = async (itemId: string): Promise<void> => {
    try {
      setIsLoading(true);
      setActionError(null);
      await removeItem(itemId);
    } catch (err) {
      setActionError('Failed to remove item from cart');
      console.error('Error in removeFromCart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the entire cart
  const clearCart = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setActionError(null);
      await clearAllItems();
    } catch (err) {
      setActionError('Failed to clear cart');
      console.error('Error in clearCart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading: isLoading || loading,
    error: actionError || error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
};