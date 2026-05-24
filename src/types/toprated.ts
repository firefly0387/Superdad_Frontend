export interface ProductCategory {
  category_title: string;
}

export interface ProductSubCategory {
  sub_category_title: string;
}

export interface Product {
  id: number;
  categories: ProductCategory[];
  sub_categories: ProductSubCategory[];
  title: string;
  description: string;
  sub_description: string;
  image: string;
  quantity: number;
  price: string;
  average_rating: number;
  hot_deal: boolean;
  created_at: string;
}

export type ProductListResponse = Product[];