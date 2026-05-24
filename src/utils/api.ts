import axios from "axios";
import type { Product } from "@/types/product";
import type { Category, SubCategory } from "@/types/category";
import type { HeroResponse } from "@/types/hero";

const API_BASE_URL =
  import.meta.env.VITE_DOMAIN || "http://127.0.0.1:8000/api";

const cleanApiBaseUrl = API_BASE_URL.replace(/\/$/, "");

export const api = axios.create({
  baseURL: cleanApiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// PRODUCTS
export const getProducts = async (params: any) => {
  const res = await api.get("/product/products/", { params });
  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get(`/product/show/${id}/`);
  return res.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/product/categories/");
  return res.data;
};

export const getHeroCarousel = async (): Promise<HeroResponse> => {
  const res = await api.get("/product/hero-carousel/");
  return res.data;
};

export const getPopularProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/product/products/popular/");
  return res.data;
};

export const getSubCategories = async (): Promise<SubCategory[]> => {
  const res = await api.get("/product/subcategories/");
  return res.data;
};

export const getHotDeals = async (): Promise<Product[]> => {
  const res = await api.get("/product/hot-deals/");
  return res.data;
};

// CART
export const addToCartApi = async (productId: number, quantity = 1) => {
  const { data } = await api.post("/product/cart/add/", {
    product_id: productId,
    quantity,
  });

  return data;
};

export const getCartApi = async () => {
  const cart_id = localStorage.getItem("cart_id");

  // no cart created yet → avoid 404
  if (!cart_id) {
    return { items: [] };
  }

  const { data } = await api.get("/product/cart/view/", {
    params: { cart_id },
  });

  return data;
};

export const removeCartItemApi = async (id: number) => {
  return api.delete(`/product/cart/item/remove/${id}/`);
};

export const updateCartItemApi = async (
  id: number,
  cart: string,
  quantity: number
) => {
  return api.patch(`/product/cart/item/update/${id}/`, {
    cart_id: cart,
    quantity,
  });
};