export type CartItem = {
  id: number;
  product: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type CartResponse = {
  items: CartItem[];
  total: number;
};