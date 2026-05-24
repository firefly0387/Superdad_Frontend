import type { ProductCategory } from "./product";

export interface ProductSidebarProps {
  categories: ProductCategory[];
  category: number | ""; // ID based filtering
  setCategory: (v: number | "") => void;

  minPrice: number | "";
  setMinPrice: (v: number | "") => void;

  maxPrice: number | "";
  setMaxPrice: (v: number | "") => void;

  minRating: number | "";
  setMinRating: (v: number | "") => void;

  totalCount: number;
}