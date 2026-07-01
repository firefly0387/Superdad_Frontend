export interface ProductCategory {
  id: number;
  category_title: string;
}

export interface ProductSubCategory {
  id: number;
  sub_category_title: string;
}

// ========================
// IMAGE (FIXED)
// ========================
export interface ProductImage {
  id: number;
  image: string;
  caption: string | null;
  created_at: string;
}

// ========================
// FAQ (FIXED)
// ========================
export interface ProductFAQ {
  id: number;
  product: number;
  question: string;
  answer: string;
  created_at: string;
}

// ========================
// REVIEW (FIXED OK)
// ========================
export interface ProductReview {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
}

// ========================
// MAIN PRODUCT (COMPLETE)
// ========================
export interface Product {
  id: number;

  hot_deal: boolean;

  categories: ProductCategory[];
  sub_categories: ProductSubCategory[];
  colors: Color[];
  sizes: Size[];

  title: string;
  description: string;
  sub_description: string;

  color: string;
  image: string;
  add_image?: string | null;

  additional_images: ProductImage[];

  faqs: ProductFAQ[];
  reviews: ProductReview[];

  quantity: number;


  price: string;
  discount_per: string;     // ✅ MISSING in your original
  final_price: number;       // ✅ YOU USE THIS IN UI

  average_rating: number;

  created_at: string;
}

// ========================
// PAGINATED RESPONSE
// ========================
export interface ProductListResponse {
  status: string;
  message: string;

  links: {
    next: string | null;
    previous: string | null;
  };

  count: number;
  total_pages: number;
  current_page: number;

  results: Product[];
}

export interface Color {
  id: number;
  name: string;
  hex_code: string;
}

export interface Size {
  id: number;
  name: string;
}