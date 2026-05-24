import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPopularProducts } from "@/utils/api";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function TopRatedSection() {
  const [topRated, setTopRated] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getPopularProducts();

        const sorted = [...data]
          .sort((a, b) => b.average_rating - a.average_rating)
          .slice(0, 4);

        setTopRated(sorted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="px-6 md:px-12 py-20 bg-linear-to-b from-[#fff8f6]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium mb-4">
            <Star size={13} fill="currentColor" />
            Top Rated
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Parents’ Favourite Picks
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {topRated.map((item) => (
            <motion.div key={item.id} className="group">
              <div className="rounded-[28px] bg-[#fbfaf8] p-3 hover:shadow-lg transition">
                <div className="relative overflow-hidden rounded-[22px] bg-white">
                  <img
                    src={item.image}
                    className="h-56 w-full object-cover group-hover:scale-105 transition"
                  />

                  {/* ADD TO CART */}
                  <button
                    onClick={() => {
                      addToCart(item);
                      toast.success("Added to cart 🛒");
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500"
                  >
                    <ShoppingCart size={16} />
                  </button>

                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-xs text-amber-600">
                    <Star size={11} fill="currentColor" />
                    {item.average_rating}
                  </div>
                </div>

                <div className="pt-4 px-1">
                  <h3 className="text-sm font-medium">{item.title}</h3>

                  <div className="flex justify-between mt-3">
                    <p className="font-semibold">
                      Rs {Number(item.price).toLocaleString()}
                    </p>

                    <button
                      onClick={() => navigate(`/products/${item.id}`)}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
