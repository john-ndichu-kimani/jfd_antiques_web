"use client"

import { useState, useEffect } from 'react';

// types/category.ts
export interface Category {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  imageUrl?: string;
  image?: string; // Added to match API response
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  slug?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  slug?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
  page?: number;
  limit?: number;
}

// API Response interface to match your actual API
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// services/categoryService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  const result = await response.json();
  
  // Handle the API response structure
  if (result.success && result.data !== undefined) {
    return result.data;
  }
  
  return result;
};

// Helper function to normalize category data
const normalizeCategory = (category: any): Category => {
  return {
    ...category,
    imageUrl: category.image || category.imageUrl,
    featured: category.featured || false, // Default to false if not provided
  };
};

// PUBLIC ROUTES

/**
 * Get all categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse<Category[]>(response);
    
    // Normalize the data to match our expected structure
    return Array.isArray(data) ? data.map(normalizeCategory) : [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse<Category>(response);
    return normalizeCategory(data);
  } catch (error) {
    console.error(`Failed to fetch category ${id}:`, error);
    throw error;
  }
};

// PROTECTED ADMIN ROUTES

/**
 * Create a new category (Admin only)
 */
export const createCategory = async (categoryData: CreateCategoryRequest): Promise<Category> => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });

    const data = await handleResponse<Category>(response);
    return normalizeCategory(data);
  } catch (error) {
    console.error('Failed to create category:', error);
    throw error;
  }
};

/**
 * Update a category (Admin only)
 */
export const updateCategory = async (
  id: string,
  categoryData: UpdateCategoryRequest
): Promise<Category> => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });

    const data = await handleResponse<Category>(response);
    return normalizeCategory(data);
  } catch (error) {
    console.error(`Failed to update category ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a category (Admin only)
 */
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // For DELETE requests, we might not have a response body
    if (response.status !== 204) {
      await response.json();
    }
  } catch (error) {
    console.error(`Failed to delete category ${id}:`, error);
    throw error;
  }
};

// ADDITIONAL UTILITY FUNCTIONS

/**
 * Get featured categories
 */
export const getFeaturedCategories = async (): Promise<Category[]> => {
  try {
    const categories = await getAllCategories();
    console.log('All categories:', categories);
    
    return categories.filter((category: Category) => category.featured === true);
  } catch (error) {
    console.error('Failed to fetch featured categories:', error);
    throw error;
  }
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  try {
    const response = await fetch(`${API_URL}/categories/slug/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse<Category>(response);
    return normalizeCategory(data);
  } catch (error) {
    console.error(`Failed to fetch category with slug ${slug}:`, error);
    throw error;
  }
};

// REACT HOOKS FOR CATEGORIES

/**
 * Custom hook to fetch all categories
 */
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCategories();
      setCategories(data || []); // Ensure it's always an array
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      setCategories([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};

/**
 * Custom hook to fetch a single category
 */
export const useCategory = (id: string) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getCategoryById(id);
      setCategory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch category');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  return {
    category,
    loading,
    error,
    refetch: fetchCategory,
  };
};

/**
 * Custom hook for category mutations (create, update, delete)
 */
export const useCategoryMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMutation = async <T>(
    mutationFn: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mutation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const create = (categoryData: CreateCategoryRequest) =>
    handleMutation(() => createCategory(categoryData));

  const update = (id: string, categoryData: UpdateCategoryRequest) =>
    handleMutation(() => updateCategory(id, categoryData));

  const remove = (id: string) =>
    handleMutation(() => deleteCategory(id));

  return {
    create,
    update,
    remove,
    loading,
    error,
  };
};