'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Cart, 
  CartItem, 
  getCart, 
  addToCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart as clearCartService,
  getCartSessionId
} from '../lib/services/cart_services';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  cartItems: CartItem[];
  totalPrice: number;
  addItem: (productId: string, quantity: number, price?: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  // Initialize the cart on first render
  useEffect(() => {
    const initializeCart = async () => {
      try {
        // Get the cart session ID or create one
        const cartSessionId = getCartSessionId();
        setSessionId(cartSessionId);
        
        if (cartSessionId) {
          await refreshCart(cartSessionId);
        }
      } catch (err) {
        setError('Failed to initialize cart');
        console.error('Cart initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, []);

  // Fetch or refresh the cart
  const refreshCart = async (sid?: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await getCart(sid || sessionId);
      setCart(cartData);
    } catch (err) {
      setError('Failed to fetch cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add an item to the cart
  const addItem = async (productId: string, quantity: number, price?: number): Promise<void> => {
    if (!cart) return;
    
    try {
      setLoading(true);
      await addToCart(cart.id, productId, quantity, price);
      await refreshCart();
    } catch (err) {
      setError('Failed to add item to cart');
      console.error('Error adding item to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update an item in the cart
  const updateItem = async (itemId: string, quantity: number): Promise<void> => {
    try {
      setLoading(true);
      await updateCartItemQuantity(itemId, quantity);
      await refreshCart();
    } catch (err) {
      setError('Failed to update item');
      console.error('Error updating cart item:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove an item from the cart
  const removeItem = async (itemId: string): Promise<void> => {
    try {
      setLoading(true);
      await removeFromCart(itemId);
      await refreshCart();
    } catch (err) {
      setError('Failed to remove item');
      console.error('Error removing item from cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear the entire cart
  const clearCart = async (): Promise<void> => {
    if (!cart) return;
    
    try {
      setLoading(true);
      await clearCartService(cart.id);
      await refreshCart();
    } catch (err) {
      setError('Failed to clear cart');
      console.error('Error clearing cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate derived values
  const cartItems = cart?.items || [];
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value: CartContextType = {
    cart,
    loading,
    error,
    cartItems,
    totalPrice,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refreshCart: () => refreshCart(),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};