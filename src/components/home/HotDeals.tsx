import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHotDeals } from "@/utils/api";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function HotDealsSection() {
  const [hotDeals, setHotDeals] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const data = await getHotDeals();
        setHotDeals(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotDeals();
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Hot Deals</h2>
          <p className="text-gray-500 mt-2">Fresh picks for modern dads</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {hotDeals.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-sm border border-white/50 p-4 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  className="h-56 w-full object-cover hover:scale-105 transition duration-500"
                />

                <button
                  onClick={() => addToCart(item)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center"
                >
                  🛒
                </button>
              </div>

              <h3 className="mt-3 text-sm font-medium text-gray-800">
                {item.title}
              </h3>

              <div className="flex justify-between mt-3">
                <p className="font-semibold text-gray-900">
                  Rs {Number(item.price).toLocaleString()}
                </p>

                <button
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="text-xs px-3 py-1 rounded-full border hover:bg-gray-50"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
