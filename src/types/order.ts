// types/order.ts
export interface OrderData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  payment_method: "cod" | "esewa" | "khalti";
  cart_id: string;
  product_id?: number;
  quantity?: number;
}

export interface OrderResponse {
  status: string;
  message: string;
  order_id?: number;
  data?: OrderData;
}

export interface OrderError {
  status: string;
  message: string;
  errors?: Record<string, string[]>;
}