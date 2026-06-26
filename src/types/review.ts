// src/types/review.ts

export interface Review {
  id: number;
  name: string;
  email: string;
  image?: string;
  rating: number;
  comment: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReviewFormData {
  name: string;
  email: string;
  image: string;
  rating: number;
  comment: string;
}

export interface ReviewResponse {
  success: boolean;
  data?: Review;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ReviewsListResponse {
  success: boolean;
  data?: Review[];
  count?: number;
  message?: string;
}

export interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}