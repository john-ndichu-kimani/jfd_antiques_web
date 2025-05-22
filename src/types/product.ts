export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Tribe {
  id: string;
  name: string;
  slug: string;
  description: string;
  region: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; 
  stockQuantity: number; 
  categoryId: string;
  tribeId: string;
  createdAt: string;
  updatedAt: string;
  isAntique: boolean;
  isFeatured: boolean;
  origin: string;
  materials: string;
  dimensions: string;
  condition: string;
  isPublished: boolean;
  category: Category;
  tribe: Tribe;
  images: ProductImage[]; // Changed from string[] to ProductImage[]
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number; // Changed from 'totalPages' to 'pages' to match backend
}

export interface ProductsData {
  products: Product[];
}

export interface ProductsResponse {
  success: boolean;
  data: ProductsData;
  pagination?: PaginationData;
  message?: string;
}

export interface ProductData {
  product: Product;
}

export interface ProductResponse {
  success: boolean;
  data?: ProductData;
  message?: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: string | number; // Allow both string and number for flexibility
  stockQuantity: number; // Changed from 'inventory'
  categoryId: string;
  tribeId: string;
  isPublished?: boolean;
  isAntique?: boolean;
  isFeatured?: boolean;
  origin?: string;
  materials?: string;
  dimensions?: string;
  condition?: string;
}

export interface UpdateProductInput {
  id: string;
  name?: string;
  description?: string;
  price?: string | number;
  stockQuantity?: number; // Changed from 'inventory'
  categoryId?: string;
  tribeId?: string;
  isPublished?: boolean;
  isAntique?: boolean;
  isFeatured?: boolean;
  origin?: string;
  materials?: string;
  dimensions?: string;
  condition?: string;
}