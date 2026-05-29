import React, { createContext, useContext, useReducer, useEffect } from "react";

import {
  addToCartApi,
  getCartApi,
  updateCartItemApi,
  removeCartItemApi,
} from "@/utils/api";

// Define proper types
interface Color {
  id: number;
  name: string;
  hex_code: string;
}

interface CartItem {
  id: number;
  product: any;
  quantity: number;
  selectedColor?: Color | null;
}

interface CartState {
  items: CartItem[];
}

const CartContext = createContext<any>(null);

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState, action: any): CartState => {
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
          (item: CartItem) => item.id !== action.payload
        ),
      };

    case "UPDATE_ITEM_COLOR":
      return {
        ...state,
        items: state.items.map((item: CartItem) =>
          item.id === action.payload.itemId
            ? { ...item, selectedColor: action.payload.color }
            : item
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // LOAD CART ON START - FIXED
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCartApi();
        
        // Transform API response to include color if available
        const itemsWithColors = (res.items || []).map((item: any) => {
          const savedColor = localStorage.getItem(`product_${item.product?.id}_color`);
          return {
            ...item,
            selectedColor: savedColor ? JSON.parse(savedColor) : null,
          };
        });
        
        dispatch({
          type: "SET_CART",
          payload: itemsWithColors,
        });
      } catch (err) {
        console.error("Cart load error:", err);
        // Set empty cart on error
        dispatch({
          type: "SET_CART",
          payload: [],
        });
      }
    };

    fetchCart();
  }, []);

  // ADD TO CART - FIXED
  const addToCart = async (product: any) => {
    try {
      // Store color in localStorage for this cart item
      if (product.selectedColor) {
        localStorage.setItem(
          `product_${product.id}_color`,
          JSON.stringify(product.selectedColor)
        );
      }

      // Call API with product ID and quantity
      const response = await addToCartApi(product.id, product.quantity || 1);
      
      // Store cart_id if returned from API
      if (response.cart_id) {
        localStorage.setItem("cart_id", response.cart_id);
      }

      // Fetch updated cart
      const cart = await getCartApi();
      
      // Merge colors back into cart items
      const itemsWithColors = (cart.items || []).map((item: any) => {
        const savedColor = localStorage.getItem(`product_${item.product?.id}_color`);
        return {
          ...item,
          selectedColor: savedColor ? JSON.parse(savedColor) : null,
        };
      });

      dispatch({
        type: "SET_CART",
        payload: itemsWithColors,
      });
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // REMOVE item with color cleanup
  const removeFromCart = async (id: number) => {
    try {
      // Find item to get product ID for color cleanup
      const itemToRemove = state.items.find((item: CartItem) => item.id === id);
      if (itemToRemove?.product?.id) {
        localStorage.removeItem(`product_${itemToRemove.product.id}_color`);
      }

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

      await updateCartItemApi(id, cartId, qty);

      const cart = await getCartApi();
      
      // Preserve colors when updating cart
      const itemsWithColors = (cart.items || []).map((item: any) => {
        const savedColor = localStorage.getItem(`product_${item.product?.id}_color`);
        return {
          ...item,
          selectedColor: savedColor ? JSON.parse(savedColor) : null,
        };
      });

      dispatch({
        type: "SET_CART",
        payload: itemsWithColors,
      });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // UPDATE ITEM COLOR
  const updateItemColor = async (itemId: number, productId: number, color: Color | null) => {
    try {
      if (color) {
        localStorage.setItem(`product_${productId}_color`, JSON.stringify(color));
      } else {
        localStorage.removeItem(`product_${productId}_color`);
      }

      dispatch({
        type: "UPDATE_ITEM_COLOR",
        payload: { itemId, color },
      });
    } catch (err) {
      console.error("Update color error:", err);
    }
  };

  // CLEAR CART - Don't remove cart_id, just clear items
  const clearCart = () => {
    // Clear all color data from localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('product_') && key.endsWith('_color')) {
        localStorage.removeItem(key);
      }
    });

    dispatch({
      type: "SET_CART",
      payload: [],
    });
    
    // Don't remove cart_id here - keep it for future additions
  };

  // RESET CART - Complete reset after order (creates new cart on next add)
  const resetCart = () => {
    // Clear all color data from localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('product_') && key.endsWith('_color')) {
        localStorage.removeItem(key);
      }
    });

    dispatch({
      type: "SET_CART",
      payload: [],
    });

    // Remove cart_id to force creation of new cart on next add
    localStorage.removeItem("cart_id");
  };

  const total = state.items.reduce(
    (acc: number, item: CartItem) =>
      acc + Number(item.product?.final_price || item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemColor,
        clearCart,
        resetCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);