import type { SubCategory } from "./subCategory";

export type CategoryProduct = {
  id: number;
  title: string;
  price: number;
};

export type Category = {
  id: number;
  title: string;
  subcategories: SubCategory[];
  products: CategoryProduct[];
  created_at?: string;
};