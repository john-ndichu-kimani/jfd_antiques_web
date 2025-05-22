
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tribe {
  id: string;
  name: string;
  slug: string;
  region: string;
  description?: string;
  logoUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  inventory: number;
  isPublished: boolean;
  isFeatured?: boolean;
  images: string[];
  categoryId: string;
  category: Category;
  tribeId: string;
  tribe: Tribe;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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
  price: number;
  inventory: number;
  categoryId: string;
  tribeId: string;
  isPublished?: boolean;
}

export interface UpdateProductInput {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  inventory?: number;
  categoryId?: string;
  tribeId?: string;
  isPublished?: boolean;
}