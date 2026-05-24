import React, { createContext, useContext, useReducer, useEffect } from "react";

import {
  addToCartApi,
  getCartApi,
  updateCartItemApi,
  removeCartItemApi,
} from "@/utils/api";

const CartContext = createContext<any>(null);

const initialState = {
  items: [],
};

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        items: action.payload,
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item: any) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // LOAD CART ON START
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCartApi();
        dispatch({
          type: "SET_CART",
          payload: res.items || [],
        });
      } catch (err) {
        console.error("Cart load error:", err);
      }
    };

    fetchCart();
  }, []);

  // ADD TO CART
  const addToCart = async (product: any) => {
    try {
      await addToCartApi(product.id, 1);

      const cart = await getCartApi();

      dispatch({
        type: "SET_CART",
        payload: cart.items || [],
      });
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // REMOVE
  const removeFromCart = async (id: number) => {
    try {
      await removeCartItemApi(id);

      dispatch({
        type: "REMOVE_ITEM",
        payload: id,
      });
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  // UPDATE QUANTITY
  const updateQuantity = async (id: number, quantity: number | string) => {
    try {
      const qty = Number(quantity);
      if (qty < 1) return;

      const cartId = localStorage.getItem("cart_id");
      if (!cartId) return;

      await updateCartItemApi(id, qty, cartId);

      const cart = await getCartApi();

      dispatch({
        type: "SET_CART",
        payload: cart.items || [],
      });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const clearCart = () => {
    dispatch({
      type: "SET_CART",
      payload: [],
    });

    localStorage.removeItem("cart_id");
  };

  const total = state.items.reduce(
    (acc: number, item: any) =>
      acc + Number(item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);