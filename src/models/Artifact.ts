export interface Artifact {
  
  id: number;
  name: string;
  tribe: string;
  price: number;
  description: string;
  material: string;
  dimensions: string;
  featured:boolean;
  image: string;
  images: string[];
}