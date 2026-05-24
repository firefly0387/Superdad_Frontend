import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartApi, updateCartItemApi, removeCartItemApi } from "@/utils/api";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await getCartApi();
      setCartItems(res.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id: number, cart: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      await updateCartItemApi(id, cart, quantity);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };
  const removeItem = async (id: number) => {
    try {
      await removeCartItemApi(id);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.total_price || 0),
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Looks like you haven’t added anything yet.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-medium hover:opacity-95 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-10 py-10">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-10">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="hidden md:grid grid-cols-3 text-sm font-medium text-gray-500 border-b border-gray-100 pb-4 mb-4">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Subtotal</span>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => {
              // DEBUG LOGS 👇
              console.log("FULL ITEM:", item);
              console.log({
                cartItemId: item.id,
                cartId: item.cart_id,
                productId: item.product?.id,
                quantity: item.quantity,
              });

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-gray-100 pb-4"
                >
                  {/* PRODUCT */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-2xl bg-gray-100"
                    />

                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {item.product?.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Rs {Number(item.product?.price || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex md:justify-center">
                    <div className="flex items-center rounded-2xl bg-gray-100 p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cart, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-xl hover:bg-white transition"
                      >
                        −
                      </button>

                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cart, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-xl hover:bg-white transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* SUBTOTAL */}
                  <div className="flex md:block items-center justify-between text-right">
                    <p className="font-medium text-gray-900">
                      Rs {Number(item.total_price || 0).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-1 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Cart Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rs {total.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-100 pt-4 mt-4">
            <span>Total</span>
            <span>Rs {total.toLocaleString()}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-medium hover:opacity-95 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
