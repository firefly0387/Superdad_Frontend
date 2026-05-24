export interface ProductCategory {
  id: number;              // ✅ IMPORTANT for filtering
  category_title: string;
}

export interface ProductSubCategory {
  id: number;
  sub_category_title: string;
}

// ========================
// FAQ
// ========================
export interface ProductFAQ {
  question: string;
  answer: string;
}

// ========================
// REVIEW
// ========================
export interface ProductReview {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
}

// ========================
// MAIN PRODUCT
// ========================
export interface Product {
  hot_deal?: boolean;
  id: number;

  categories: ProductCategory[];
  sub_categories: ProductSubCategory[];

  title: string;
  description: string;
  sub_description: string;

  color: string;
  image: string;

  additional_images: string[];

  faqs: ProductFAQ[];
  reviews: ProductReview[];

  quantity: number;

  price: string;
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