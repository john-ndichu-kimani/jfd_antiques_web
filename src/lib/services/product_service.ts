import { CreateProductInput, ProductResponse, ProductsResponse, UpdateProductInput } from "@/types/product";
import { ok } from "assert";
import axios from 'axios';


const API_URL ='http://localhost:5000/api';

/**
 * Get auth token from local storage or session storage
 */
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null; // We're on the server side
  }
  
  // Check localStorage first
  const token = localStorage.getItem('authToken');
  if (token) return token;
  
  // Then check sessionStorage
  return sessionStorage.getItem('authToken');
};

/**
 * Get all products with optional pagination
 */

export const getAllProducts = async (page = 1, limit = 12): Promise<ProductsResponse> => {
  try {
    const response = await axios.get<ProductsResponse>(`${API_URL}/products`, {
      params: { page, limit },
    });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id: string): Promise<ProductResponse> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Get Featured Products
 */

export const getFeaturedProducts = async (page = 1, limit = 12): Promise<ProductsResponse> => {
  try {
    const response = await axios.get<ProductsResponse>(`${API_URL}/products/featured`, {
      params: { page, limit },
    });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};

/**
 * Toggle product is featured
 */
// export const toggleProductFeatured = async (id: string): Promise<ProductResponse> => {
//   try {
//     const response = await fetch(`${API_URL}/products/${id}/featured`);
    
//     if (!response.ok) {
//       throw new Error(`Error fetching product: ${response.statusText}`);
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error(`Failed to fetch product with ID ${id}:`, error);
//     throw error;
//   }
// };

/**
 * Get a single product by slug
 */
export const getProductBySlug = async (slug: string): Promise<ProductResponse> => {
  try {
    const response = await fetch(`${API_URL}/products/slug/${slug}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    throw error;
  }
};

/**
 * Create a new product
 */
export const createProduct = async (productData: CreateProductInput): Promise<ProductResponse> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication token not found. Please login.');
  }
  
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error(`Error creating product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (productData: UpdateProductInput): Promise<ProductResponse> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication token not found. Please login.');
  }
  
  try {
    const { id, ...updateData } = productData;
    
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to update product with ID ${productData.id}:`, error);
    throw error;
  }
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (id: string): Promise<{ success: boolean }> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication token not found. Please login.');
  }
  
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Search products by query
 */
export const searchProducts = async (query: string, page = 1, limit = 12): Promise<ProductsResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/products/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`Error searching products: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to search products with query ${query}:`, error);
    throw error;
  }
};

/**
 * Get products by category ID
 */
export const getProductsByCategory = async (categoryId: string, page = 1, limit = 12): Promise<ProductsResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/products/category/${categoryId}?page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching products by category: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch products for category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Get products by tribe ID
 */
export const getProductsByTribe = async (
  tribeId: string, 
  page = 1, 
  limit = 12
): Promise<ProductsResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/products/tribe/${tribeId}?page=${page}&limit=${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response);
    

    // Proper status code check
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    const data: ProductsResponse = await response.json();
    
    // Validate response structure
    if (!data.success || !data.data?.products || !data.pagination) {
      throw new Error('Invalid response structure from API');
    }

    return data;
  } catch (error) {
    console.error(`Failed to fetch products for tribe ${tribeId}:`, error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch products by tribe'
    );
  }
};

/**
 * Toggle product publication status
 */
export const toggleProductPublication = async (id: string, isPublished: boolean): Promise<ProductResponse> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication token not found. Please login.');
  }
  
  try {
    const response = await fetch(`${API_URL}/products/${id}/publish`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isPublished }),
    });
    
    if (!response.ok) {
      throw new Error(`Error toggling product publication: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to toggle publication for product with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Upload product images
 */
export const uploadProductImages = async (productId: string, formData: FormData): Promise<any> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication token not found. Please login.');
  }
  
  try {
    const response = await fetch(`${API_URL}/products/${productId}/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Note: Don't set Content-Type for FormData
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Error uploading product images: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to upload product images:', error);
    throw error;
  }
};

/**
 * Set main product image
 */
export const setMainProductImage = async (productId: string, imageId: string): Promise<any> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication token not found. Please login.');
  }
  
  try {
    const response = await fetch(`${API_URL}/products/${productId}/images/${imageId}/set-main`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error setting main product image: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to set main product image:', error);
    throw error;
  }
};

/**
 * Delete product image
 */
export const deleteProductImage = async (productId: string, imageId: string): Promise<any> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication token not found. Please login.');
  }
  
  try {
    const response = await fetch(`${API_URL}/products/${productId}/images/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting product image: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to delete product image:', error);
    throw error;
  }
};