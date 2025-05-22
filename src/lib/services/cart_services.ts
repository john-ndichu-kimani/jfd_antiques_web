import { v4 as uuidv4 } from 'uuid';

// Types for our cart and related data
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Cart {
  id: string;
  sessionId: string;
  total: number;
  items: CartItem[];
}

// Base API URL - you can set this from your environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Get or create a cart for the given session ID
 * @param sessionId The session ID to get the cart for
 */
export const getCart = async (sessionId: string): Promise<Cart> => {
  // If no sessionId provided, generate one
  const cartSessionId = sessionId || uuidv4();
  
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${cartSessionId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get cart: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

/**
 * Add an item to the cart
 * @param cartId The cart ID
 * @param productId The product ID to add
 * @param quantity The quantity to add
 * @param price Optional price override
 */
export const addToCart = async (
  cartId: string,
  productId: string,
  quantity: number,
  price?: number
): Promise<CartItem> => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        quantity,
        price,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to add item to cart: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

/**
 * Update the quantity of an item in the cart
 * @param itemId The cart item ID
 * @param quantity The new quantity
 */
export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
): Promise<CartItem | { message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update cart item: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

/**
 * Remove an item from the cart
 * @param itemId The cart item ID to remove
 */
export const removeFromCart = async (
  itemId: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/items/${itemId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to remove item from cart: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

/**
 * Clear all items from the cart
 * @param cartId The cart ID to clear
 */
export const clearCart = async (
  cartId: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to clear cart: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

/**
 * Helper function to get or create a cart session ID
 * This can be used for initial client-side setup
 */
export const getCartSessionId = (): string => {
  // Check if running on client side
  if (typeof window !== 'undefined') {
    // Try to get existing session ID from localStorage
    let sessionId = localStorage.getItem('cartSessionId');
    
    // If no session ID exists, create one and store it
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('cartSessionId', sessionId);
    }
    
    return sessionId;
  }
  
  // For server-side, return an empty string or handle appropriately
  return '';
};