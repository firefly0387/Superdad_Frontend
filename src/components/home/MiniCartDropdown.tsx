import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { X, Trash2, ShoppingBag } from "lucide-react";

const MiniCartDropdown = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { state, total, removeFromCart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Handle escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleRemoveItem = (item: any) => {
    removeFromCart(item.id);
    toast.success("Item removed from cart", {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#5C3D2E",
        color: "#f5e7db",
        border: "1px solid #8B6914",
      },
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div 
        ref={dropdownRef}
        className="fixed right-4 top-[70px] w-96 rounded-2xl border border-[#E8D5B7] bg-white shadow-2xl overflow-hidden"
        style={{ zIndex: 9999 }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#5C3D2E] to-[#4A3226]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-white" />
            <h3 className="font-semibold text-white">Your Cart</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">
              {state.items.length} item{state.items.length !== 1 ? "s" : ""}
            </span>
            
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* EMPTY STATE */}
        {state.items.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Your cart feels a little empty
            </p>
            <button
              onClick={() => {
                navigate("/products");
                onClose();
              }}
              className="mt-2 text-sm text-[#5C3D2E] hover:underline font-medium"
            >
              Continue Shopping →
            </button>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
              {state.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-4 hover:bg-gray-50 transition-colors group"
                >
                  <img
                    src={item.product?.image}
                    alt={item.product?.title || item.product?.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.product?.title || item.product?.name}
                        </p>
                        
                        {item.selectedColor && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <div 
                              className="w-3 h-3 rounded-full ring-1 ring-gray-200" 
                              style={{ backgroundColor: item.selectedColor.hex_code }}
                            />
                            <span className="text-xs text-gray-500">
                              {item.selectedColor.name}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          Rs {Number(item.product?.final_price || item.product?.price || 0).toLocaleString()} each
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        Rs {(Number(item.product?.final_price || item.product?.price || 0) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">
                  Rs {total.toLocaleString()}
                </span>
              </div>
              
              <p className="text-xs text-gray-500 mb-4">
                *Shipping charges will be calculated at checkout
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    navigate("/cart");
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  View Cart
                </button>

                <button
                  onClick={() => {
                    navigate("/checkout");
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5C3D2E] to-[#4A3226] text-white text-sm font-medium hover:from-[#4A3226] hover:to-[#3D261B] transition-all shadow-md"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MiniCartDropdown;