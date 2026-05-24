import { useState } from "react";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { state, total } = useCart();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });

  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-10 py-10">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* LEFT FORM */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Billing Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="First name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
            />

            <input
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
            />
          </div>

          <input
            placeholder="Street address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 mt-4 outline-none focus:border-gray-400"
          />

          <input
            placeholder="Town / City"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 mt-4 outline-none focus:border-gray-400"
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 mt-4 outline-none focus:border-gray-400"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 mt-4 outline-none focus:border-gray-400"
          />
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Your Order
          </h2>

          <div className="space-y-3">
            {state.items.map((item:any) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 text-sm text-gray-700"
              >
                <span className="truncate">
                  {item.name} × {item.quantity}
                </span>

                <span className="font-medium whitespace-nowrap">
                  Rs {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 my-5" />

          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>Rs {total.toLocaleString()}</span>
          </div>

          {/* PAYMENT */}
          <div className="mt-6 space-y-3">
            <label className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 cursor-pointer">
              <input type="radio" name="payment" defaultChecked />
              <span className="text-sm text-gray-700">
                Cash on delivery
              </span>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 cursor-pointer">
              <input type="radio" name="payment" />
              <span className="text-sm text-gray-700">
                eSewa / Khalti (coming soon)
              </span>
            </label>
          </div>

          <button className="w-full mt-6 py-3 rounded-2xl bg-linear-to-r from-rose-500 to-orange-400 text-white font-medium hover:opacity-95 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;