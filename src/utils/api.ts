import axios from "axios";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import type { SubCategory } from "@/types/subCategory";
import type { HeroResponse } from "@/types/hero";
import type { ContactFormData, ContactResponse } from "@/types/contact";
import type { OrderData, OrderResponse } from "@/types/order";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

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
export const addToCartApi = async (productId: number, quantity = 1): Promise<any> => {
  try {
    let cart_id = localStorage.getItem("cart_id");

    const payload: any = {
      product_id: productId,
      quantity,
    };

    // Only include cart_id if it exists
    if (cart_id) {
      payload.cart_id = cart_id;
    }

    const { data } = await api.post("/product/cart/add/", payload);

    // Store cart_id if returned from backend
    if (data.cart_id) {
      localStorage.setItem("cart_id", data.cart_id);
    }

    return data;
  } catch (error: any) {
    // If cart not found, retry without cart_id
    if (error.response?.status === 404 && localStorage.getItem("cart_id")) {
      localStorage.removeItem("cart_id");
      return addToCartApi(productId, quantity);
    }
    throw error;
  }
};

export const getCartApi = async () => {
  const cart_id = localStorage.getItem("cart_id");

  // no cart created yet → return empty cart
  if (!cart_id) {
    return { items: [], count: 0, total: 0 };
  }

  try {
    const { data } = await api.get("/product/cart/view/", {
      params: { cart_id },
    });
    return data;
  } catch (error: any) {
    // If cart not found (404), clear invalid cart_id and return empty cart
    if (error.response?.status === 404) {
      localStorage.removeItem("cart_id");
      return { items: [], count: 0, total: 0 };
    }
    throw error;
  }
};

export const removeCartItemApi = async (id: number) => {
  return api.delete(`/product/cart/item/remove/${id}/`);
};

export const updateCartItemApi = async (
  id: number,
  cart: string,
  quantity: number | string,
) => {
  return api.patch(`/product/cart/item/update/${id}/`, {
    cart_id: cart,
    quantity,
  });
};

// CONTACT US
export const submitContactForm = async (
  data: ContactFormData,
): Promise<ContactResponse> => {
  try {
    const response = await api.post("/product/contact-us/", {
      name: data.name,
      email: data.email,
      contact: Number(data.contact), // Ensure it's a number
      message: data.message,
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data);
    throw error;
  }
};

export const createOrder = async (
  orderData: OrderData,
): Promise<OrderResponse> => {
  try {
    const response = await api.post("/product/order/create/", orderData);
    return response.data;
  } catch (error: any) {
    console.error("Order API Error:", error.response?.data);
    throw error;
  }
};

//review Post

