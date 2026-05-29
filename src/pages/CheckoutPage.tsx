import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Truck, Shield, RefreshCw, CreditCard, Wallet, CheckCircle, X, Package } from "lucide-react";
import { toast } from "sonner";
import { createOrder } from "@/utils/api";
import type { OrderData } from "@/types/order";
import CheckoutPageSkeleton from "@/components/skletons/CheckoutPageSkeleton";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state, total, resetCart } = useCart(); // Use resetCart instead of clearCart
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "esewa" | "khalti">("cod");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(form.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#5C3D2E",
          color: "#f5e7db",
          border: "1px solid #8B6914",
        },
      });
      return;
    }

    if (state.items.length === 0) {
      toast.error("Your cart is empty", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#5C3D2E",
          color: "#f5e7db",
          border: "1px solid #8B6914",
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const cart_id = localStorage.getItem("cart_id");
      
      if (!cart_id) {
        toast.error("Cart not found. Please try again.", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#5C3D2E",
            color: "#f5e7db",
            border: "1px solid #8B6914",
          },
        });
        setIsSubmitting(false);
        return;
      }

      const orderData: OrderData = {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        payment_method: paymentMethod,
        cart_id: cart_id,
      };

      const response = await createOrder(orderData);
      
      // Store order details for modal
      setOrderDetails({
        orderId: response.order_id,
        total: total,
        items: state.items,
        customerName: `${form.firstName} ${form.lastName}`,
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
      
      // Reset cart completely - this will clear items and remove cart_id
      resetCart();
      
      // Show confirmation modal
      setShowConfirmation(true);
      
    } catch (error: any) {
      console.error("Order error:", error);
      
      let errorMessage = "Failed to place order. Please try again.";
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (typeof errorData === 'object') {
          const fieldErrors: Record<string, string> = {};
          
          Object.keys(errorData).forEach(key => {
            const errorValue = errorData[key];
            if (Array.isArray(errorValue) && errorValue.length > 0) {
              fieldErrors[key] = errorValue[0];
              errorMessage = errorValue[0];
            } else if (typeof errorValue === 'string') {
              fieldErrors[key] = errorValue;
              errorMessage = errorValue;
            }
          });
          
          if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#5C3D2E",
          color: "#f5e7db",
          border: "1px solid #8B6914",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 15);
      setForm({ ...form, [name]: numbersOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Order Confirmation Modal Component
  const OrderConfirmationModal = () => {
    if (!showConfirmation) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowConfirmation(false)}
        />
        
        {/* Modal */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
          {/* Success Header */}
          <div className="text-center pt-8 pb-4 border-b border-[#E8D5B7]">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold text-[#3E2723]">Order Confirmed! 🎉</h3>
            <p className="text-sm text-[#795548] mt-2">
              Thank you for your purchase
            </p>
          </div>

          {/* Order Details */}
          <div className="p-6 space-y-4">
            {/* Order ID */}
            <div className="bg-[#f5e7db] rounded-xl p-4 text-center">
              <p className="text-xs text-[#795548]">ORDER NUMBER</p>
              <p className="text-lg font-mono font-bold text-[#8B6914]">
                #{orderDetails?.orderId || "ORD" + Math.random().toString(36).substr(2, 8).toUpperCase()}
              </p>
            </div>

            {/* Customer Info */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#795548]">Customer Name:</span>
                <span className="font-medium text-[#3E2723]">{orderDetails?.customerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#795548]">Payment Method:</span>
                <span className="font-medium text-[#3E2723]">{orderDetails?.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#795548]">Order Date:</span>
                <span className="font-medium text-[#3E2723]">{orderDetails?.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#795548]">Order Time:</span>
                <span className="font-medium text-[#3E2723]">{orderDetails?.time}</span>
              </div>
            </div>

            {/* Items Summary */}
            <div className="border-t border-[#E8D5B7] pt-4">
              <p className="text-sm font-semibold text-[#3E2723] mb-3">Order Summary</p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {orderDetails?.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-[#795548]">
                      {item.product?.title || item.product?.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-[#3E2723]">
                      Rs {(Number(item.product?.final_price || item.product?.price || 0) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-[#E8D5B7] pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#3E2723]">Total Amount</span>
                <span className="text-2xl font-bold text-[#8B6914]">
                  Rs {orderDetails?.total?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-[#f5e7db] rounded-xl p-4 text-center">
              <Package className="w-5 h-5 mx-auto text-[#8B6914] mb-2" />
              <p className="text-xs text-[#795548]">Estimated Delivery</p>
              <p className="text-sm font-medium text-[#3E2723]">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  navigate("/products");
                }}
                className="flex-1 py-2.5 rounded-xl border border-[#8B6914] text-[#5C3D2E] font-medium hover:bg-[#f5e7db] transition"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  navigate("/");
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#5C3D2E] text-white font-medium hover:bg-[#4A3226] transition"
              >
                Go to Home
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowConfirmation(false)}
            className="absolute top-4 right-4 text-[#795548] hover:text-[#3E2723] transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <CheckoutPageSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen bg-[#f5e7db] py-10 pt-27.5 md:pt-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-light text-[#3E2723] text-center mb-10">
            <span className="font-semibold text-[#8B6914]">Checkout</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT FORM */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-6">
                  Billing Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#3E2723] mb-2">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      placeholder="John"
                      value={form.firstName}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${
                        errors.first_name || errors.firstName ? "border-red-500" : "border-[#E8D5B7]"
                      } bg-white/50 px-4 py-3 text-[#3E2723] placeholder:text-[#795548]/50 outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 transition`}
                    />
                    {(errors.first_name || errors.firstName) && (
                      <p className="text-red-500 text-xs mt-1">{errors.first_name || errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#3E2723] mb-2">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${
                        errors.last_name || errors.lastName ? "border-red-500" : "border-[#E8D5B7]"
                      } bg-white/50 px-4 py-3 text-[#3E2723] placeholder:text-[#795548]/50 outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 transition`}
                    />
                    {(errors.last_name || errors.lastName) && (
                      <p className="text-red-500 text-xs mt-1">{errors.last_name || errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Street Address *
                  </label>
                  <input
                    name="address"
                    placeholder="123 Main St"
                    value={form.address}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${
                      errors.address ? "border-red-500" : "border-[#E8D5B7]"
                    } bg-white/50 px-4 py-3 text-[#3E2723] placeholder:text-[#795548]/50 outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 transition`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Town / City *
                  </label>
                  <input
                    name="city"
                    placeholder="Kathmandu"
                    value={form.city}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${
                      errors.city ? "border-red-500" : "border-[#E8D5B7]"
                    } bg-white/50 px-4 py-3 text-[#3E2723] placeholder:text-[#795548]/50 outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 transition`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="9841234567"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${
                      errors.phone ? "border-red-500" : "border-[#E8D5B7]"
                    } bg-white/50 px-4 py-3 text-[#3E2723] placeholder:text-[#795548]/50 outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 transition`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${
                      errors.email ? "border-red-500" : "border-[#E8D5B7]"
                    } bg-white/50 px-4 py-3 text-[#3E2723] placeholder:text-[#795548]/50 outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 transition`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </form>

            {/* RIGHT SUMMARY */}
            <div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-sm p-6 md:p-8 sticky top-24">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-5 border-b border-[#E8D5B7] pb-3">
                  Your Order
                </h2>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {state.items.length === 0 ? (
                    <p className="text-[#795548] text-sm text-center py-4">
                      Your cart is empty
                    </p>
                  ) : (
                    state.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex justify-between gap-4 text-sm"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-[#3E2723] truncate">
                            {item.product?.title || item.product?.name}
                          </p>
                          {item.selectedColor && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <div 
                                className="w-2.5 h-2.5 rounded-full" 
                                style={{ backgroundColor: item.selectedColor.hex_code }}
                              />
                              <span className="text-xs text-[#795548]">
                                {item.selectedColor.name}
                              </span>
                            </div>
                          )}
                          <p className="text-xs text-[#795548] mt-1">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-[#3E2723] whitespace-nowrap">
                          Rs {(Number(item.product?.final_price || item.product?.price || 0) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-[#E8D5B7] my-5" />

                <div className="space-y-2">
                  <div className="flex justify-between text-[#795548] text-sm">
                    <span>Subtotal</span>
                    <span>Rs {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#795548] text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-[#795548] text-sm">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="flex justify-between font-semibold text-[#3E2723] border-t border-[#E8D5B7] pt-4 mt-4">
                  <span className="text-lg">Total</span>
                  <span className="text-xl font-bold text-[#8B6914]">
                    Rs {total.toLocaleString()}
                  </span>
                </div>

                {/* PAYMENT METHODS */}
                <div className="mt-6 space-y-3">
                  <label className="text-sm font-medium text-[#3E2723] mb-3 block">
                    Payment Method
                  </label>
                  
                  <label className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#8B6914] bg-[#5C3D2E]/5"
                      : "border-[#E8D5B7] bg-white/50 hover:bg-white/70"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value as "cod")}
                      className="text-[#8B6914] focus:ring-[#8B6914]"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Wallet size={18} className="text-[#795548]" />
                      <span className="text-sm text-[#3E2723]">Cash on Delivery</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                    paymentMethod === "esewa"
                      ? "border-[#8B6914] bg-[#5C3D2E]/5"
                      : "border-[#E8D5B7] bg-white/50 hover:bg-white/70"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="esewa"
                      checked={paymentMethod === "esewa"}
                      onChange={(e) => setPaymentMethod(e.target.value as "esewa")}
                      className="text-[#8B6914] focus:ring-[#8B6914]"
                      disabled
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <CreditCard size={18} className="text-[#795548]" />
                      <span className="text-sm text-[#3E2723]">
                        eSewa / Khalti
                        <span className="text-xs text-[#795548] ml-2">(coming soon)</span>
                      </span>
                    </div>
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || state.items.length === 0}
                  className="w-full mt-6 py-3 rounded-xl bg-[#5C3D2E] text-white font-medium hover:bg-[#4A3226] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order
                      <Shield size={16} className="group-hover:rotate-12 transition-transform" />
                    </>
                  )}
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
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal />
    </>
  );
};

export default CheckoutPage;