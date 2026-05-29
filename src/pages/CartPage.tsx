import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartApi, updateCartItemApi, removeCartItemApi } from "@/utils/api";
import { Trash2, ShoppingBag, Truck, Shield, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import CartPageSkeleton from "@/components/skletons/CartPageSkeleton"; // Import the skeleton

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCartApi();
      setCartItems(res.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
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
      toast.success("Cart updated", {
        duration: 1500,
        position: "top-right",
        style: {
          background: "#5C3D2E",
          color: "#f5e7db",
          border: "1px solid #8B6914",
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update cart", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const removeItem = async (id: number) => {
    try {
      await removeCartItemApi(id);
      fetchCart();
      toast.success("Item removed from cart", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#5C3D2E",
          color: "#f5e7db",
          border: "1px solid #8B6914",
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.total_price || 0),
    0,
  );

  // Show skeleton while loading
  if (loading) {
    return <CartPageSkeleton />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5e7db] flex items-center justify-center px-6 ">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#f5e7db] flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-[#5C3D2E]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#3E2723] mb-2">
            Your cart is empty
          </h1>
          <p className="text-sm text-[#795548] mb-6">
            Looks like you haven't added anything yet.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-xl bg-[#5C3D2E] text-white font-medium hover:bg-[#4A3226] transition-all transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5e7db] py-10 pt-27.5 md:pt-30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-light text-[#3E2723] text-center mb-10">
          Your <span className="font-semibold text-[#8B6914]">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - Cart Items */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-sm p-6">
            <div className="hidden md:grid grid-cols-3 text-sm font-medium text-[#795548] border-b border-[#E8D5B7] pb-4 mb-4">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Subtotal</span>
            </div>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-[#E8D5B7] pb-6"
                >
                  {/* PRODUCT */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product?.image}
                      alt={item.product?.title || item.product?.name}
                      className="w-20 h-20 object-cover rounded-xl bg-[#D4C4A8]/30"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-[#3E2723] truncate">
                        {item.product?.title || item.product?.name}
                      </p>
                      <p className="text-sm text-[#795548] mt-1">
                        Rs {Number(item.product?.final_price || item.product?.price || 0).toLocaleString()}
                      </p>
                      {item.selectedColor && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.selectedColor.hex_code }}
                          />
                          <span className="text-xs text-[#795548]">
                            {item.selectedColor.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex md:justify-center">
                    <div className="flex items-center rounded-xl bg-[#f5e7db] p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cart, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg hover:bg-white transition text-[#3E2723]"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-[#3E2723]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cart, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg hover:bg-white transition text-[#3E2723]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* SUBTOTAL */}
                  <div className="flex md:block items-center justify-between">
                    <p className="font-semibold text-[#3E2723]">
                      Rs {Number(item.total_price || 0).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 md:ml-0 md:mt-2 p-2 rounded-lg text-[#795548] hover:text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-[#3E2723] mb-5 border-b border-[#E8D5B7] pb-3">
                Cart Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#795548]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#3E2723]">
                    Rs {total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#795548]">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-[#795548]">
                  <span>Tax</span>
                  <span className="text-[#3E2723]">Included</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold text-[#3E2723] border-t border-[#E8D5B7] pt-4 mt-4">
                <span className="text-lg">Total</span>
                <span className="text-xl font-bold text-[#8B6914]">
                  Rs {total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 py-3 rounded-xl bg-[#5C3D2E] text-white font-medium hover:bg-[#4A3226] transition-all transform hover:scale-105 shadow-md"
              >
                Proceed to Checkout
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t border-[#E8D5B7]">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="text-center">
                    <Truck className="w-5 h-5 mx-auto text-[#795548]" />
                    <p className="text-xs text-[#795548] mt-1">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-5 h-5 mx-auto text-[#795548]" />
                    <p className="text-xs text-[#795548] mt-1">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="w-5 h-5 mx-auto text-[#795548]" />
                    <p className="text-xs text-[#795548] mt-1">Easy Returns</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping Link */}
            <button
              onClick={() => navigate("/products")}
              className="w-full mt-4 py-3 rounded-xl border border-[#8B6914] text-[#5C3D2E] font-medium hover:bg-[#f5e7db] transition-all text-sm"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;