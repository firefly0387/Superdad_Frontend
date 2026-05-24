import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const MiniCartDropdown = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { state, total, removeFromCart } = useCart();

  return (
    <div className="absolute right-0 top-full mt-3 w-84 rounded-3xl border border-white/60 bg-white/95 backdrop-blur-xl shadow-2xl p-5 z-9999">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Your Cart</h3>

        <span className="text-xs px-2 py-1 rounded-full bg-rose-50 text-rose-500">
          {state.items.length} item{state.items.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* EMPTY STATE */}
      {state.items.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-gray-500">
            Your cart feels a little empty
          </p>
        </div>
      ) : (
        <>
          {/* ITEMS */}
          <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
            {state.items.map((item:any) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-2xl bg-gray-50/80 p-2.5 hover:bg-gray-100 transition"
              >
                {/* IMAGE */}
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="w-14 h-14 object-cover rounded-xl"
                />

                {/* DETAILS */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.product?.name}
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Qty: {item.quantity}
                  </p>

                  <p className="text-xs text-gray-500">
                    Rs {Number(item.product?.price || 0).toLocaleString()} each
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    Rs {Number(item.total_price || 0).toLocaleString()}
                  </p>
                </div>

                {/* REMOVE BUTTON (same style as before) */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-7 h-7 rounded-full bg-white text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            
            {/* TOTAL */}
            <div className="flex justify-between items-center font-medium text-gray-800">
              <span>Total</span>
              <span className="text-base">
                Rs {total.toLocaleString()}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => {
                  navigate("/cart");
                  onClose();
                }}
                className="w-full py-2.5 rounded-2xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
              >
                View Cart
              </button>

              <button
                onClick={() => {
                  navigate("/checkout");
                  onClose();
                }}
                className="w-full py-2.5 rounded-2xl bg-linear-to-r from-rose-500 to-orange-400 text-white text-sm font-medium hover:opacity-95 transition"
              >
                Checkout
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default MiniCartDropdown;