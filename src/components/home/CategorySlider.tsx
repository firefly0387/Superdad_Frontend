import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubCategories } from "@/utils/api";
import type { SubCategory } from "@/types/subCategory";
import { ArrowRight } from "lucide-react";

const CategorySlider = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<SubCategory[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const data = await getSubCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch subcategories", error);
      }
    };

    fetchSubCategories();
  }, []);

  const looped = [...categories, ...categories];

  return (
    <section className="w-full py-20 overflow-hidden bg-transparent">
      <div className="max-w-325 mx-auto px-10">
        {/* HEADER (UNCHANGED) */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="uppercase tracking-[0.2em] text-sm text-gray-400 mb-3">
            Explore Collections
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Discover Everyday Essentials
          </h2>

          <p className="text-gray-500">
            Thoughtfully selected categories made for modern dads and growing
            little ones.
          </p>
        </div>

        {/* SLIDER (UNCHANGED LOGIC) */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setHoveredIndex(null);
          }}
        >
          <div
            className="flex w-max gap-6 animate-scroll"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {looped.map((cat, i) => (
              <div
                key={i}
                className={`w-75 shrink-0 transition-all duration-300 ${
                  hoveredIndex !== null && hoveredIndex !== i
                    ? "opacity-60 scale-[0.97]"
                    : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
              >
                {/* ONLY STYLE FIXED */}
                <div className="relative h-97.5 overflow-hidden rounded-[28px] bg-white shadow-sm border border-white/50 transition-all duration-300 hover:shadow-xl">
                  <img
                    src={cat.image}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                    <div className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full">
                      <span className="text-gray-800 uppercase tracking-[0.18em] text-xs font-medium">
                        {cat.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA BUTTON (BOTTOM CENTER) */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/products")}
            className="group flex items-center gap-2 px-8 py-3 rounded-full bg-white shadow-md hover:shadow-xl text-gray-900 font-medium transition hover:scale-105"
          >
            Explore All Products
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />
          </button>
        </div>
      </div>
      {/* ANIMATION */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CategorySlider;
