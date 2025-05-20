// types/product.ts
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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  discountPrice: string;
  stockQuantity: number;
  categoryId: string;
  tribeId: string;
  createdAt: string;
  updatedAt: string;
  isAntique: boolean;
  origin: string;
  age: string;
  materials: string;
  dimensions: string;
  condition: string;
  authenticity: string;
  provenance: string;
  culturalContext: string;
  isPublished: boolean;
  category: Category;
  tribe: Tribe;
  featured:boolean;
  image:string;
  images: string[]; // You can define a more specific type if you have image data
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
  };
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ProductResponse {
  success: boolean;
  data: {
    product: Product;
  };
}

export interface CreateProductInput {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number;
  stockQuantity: number;
  categoryId: string;
  tribeId: string;
  isAntique: boolean;
  origin: string;
  age: string;
  materials: string;
  dimensions: string;
  condition: string;
  authenticity: string;
  provenance: string;
  culturalContext: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}