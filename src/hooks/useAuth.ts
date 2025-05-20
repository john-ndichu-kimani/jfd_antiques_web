"use client"

import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
  cartItems: CartItem[];
};

// Define cart item type
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// Auth context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
};

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loginWithGoogle: async () => {},
  loginWithFacebook: async () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
});

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: '123',
        name: 'Demo User',
        email: email,
        cartItems: [],
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: '123',
        name: name,
        email: email,
        cartItems: [],
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // OAuth login with Google
  const loginWithGoogle = async () => {
    try {
      // In a real app, this would redirect to Google OAuth
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: '456',
        name: 'Google User',
        email: 'google@example.com',
        cartItems: [],
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  // OAuth login with Facebook
  const loginWithFacebook = async () => {
    try {
      // In a real app, this would redirect to Facebook OAuth
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: '789',
        name: 'Facebook User',
        email: 'facebook@example.com',
        cartItems: [],
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Facebook login failed:', error);
      throw error;
    }
  };

  // Add item to cart
  const addToCart = (item: CartItem) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;
      
      const existingItemIndex = prevUser.cartItems.findIndex(i => i.id === item.id);
      
      let updatedCartItems;
      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        updatedCartItems = [...prevUser.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + item.quantity
        };
      } else {
        // Add new item
        updatedCartItems = [...prevUser.cartItems, item];
      }
      
      const updatedUser = {
        ...prevUser,
        cartItems: updatedCartItems
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updatedCartItems = prevUser.cartItems.filter(item => item.id !== itemId);
      
      const updatedUser = {
        ...prevUser,
        cartItems: updatedCartItems
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Update cart item quantity
  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updatedCartItems = prevUser.cartItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      
      const updatedUser = {
        ...prevUser,
        cartItems: updatedCartItems
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

//   return (
    // <AuthContext.Provider value={{
    //   user,
    //   isAuthenticated: !!user,
    //   isLoading,
    //   login,
    //   register,
    //   logout,
    //   loginWithGoogle,
    //   loginWithFacebook,
    //   addToCart,
    //   removeFromCart,
    //   updateCartItemQuantity
    // }}>
    //   {children}

    // </AuthContext.Provider>
//   );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);