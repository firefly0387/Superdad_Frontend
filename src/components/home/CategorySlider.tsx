import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getSubCategories } from "@/utils/api";
import type { SubCategory } from "@/types/subCategory";
import { ArrowRight, Sparkles, Package, Heart} from "lucide-react";

const CategorySlider = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<SubCategory[]>([]);
  const [, setHoveredIndex] = useState<number | null>(null);

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

  // Don't show slider if no categories
  if (categories.length === 0) return null;

  const looped = [...categories, ...categories];

  return (
    <section className="w-full py-10 overflow-hidden bg-[#f5e7db]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* HEADER with Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm text-[#8B6914] text-xs font-medium tracking-wider mb-5 shadow-sm"
          >
            <Sparkles size={12} />
            Explore Collections
            <Sparkles size={12} />
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-[#5C3D2E] mb-4 tracking-tight"
          >
            Discover Everyday Essentials
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-[#8B6914]/60 text-sm md:text-base font-light"
          >
            Thoughtfully selected categories made for modern dads and growing
            little ones
          </motion.p>
        </motion.div>

        {/* SLIDER - Uninterrupted scrolling on hover */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays for fade effect - matching the bg color */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-[#f5e7db] via-[#f5e7db]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-[#f5e7db] via-[#f5e7db]/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <div
              className="flex w-max gap-5 md:gap-7 animate-scroll"
              style={{
                animationPlayState: "running",
                animationDuration: "30s",
              }}
            >
              {looped.map((cat, i) => (
                <div
                  key={i}
                  className="w-72 md:w-80 shrink-0 transition-opacity duration-500"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative h-96 md:h-105 overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Card Background with Shadow */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#5C3D2E]/30 to-[#5C3D2E]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Image */}
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      decoding="async"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay on Image */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#5C3D2E]/80 via-[#5C3D2E]/30 to-transparent" />

                    {/* Category Title Badge */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%]">
                      <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg transform transition-opacity duration-300 group-hover:scale-105 group-hover:shadow-xl border border-[#E8D5B7]/50">
                        <p className="text-[#5C3D2E] text-sm md:text-base font-medium text-center tracking-wide">
                          {cat.title}
                        </p>
                      </div>
                    </div>

                    {/* Shop Now Button - Appears on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <button
                        onClick={() => navigate(`/products?category=${cat.id}`)}
                        className="bg-[#5C3D2E] text-[#F5E7DB] px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-opacity duration-300 hover:bg-[#4A3226] hover:shadow-xl"
                      >
                        Shop Now
                        <ArrowRight
                          size={16}
                          className="group-hover/btn:translate-x-1 transition"
                        />
                      </button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
                        <Heart size={14} className="text-rose-500" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 z-20">
                      <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
                        <Package size={14} className="text-[#5C3D2E]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <button
            onClick={() => navigate("/products")}
            className="group flex items-center gap-2 px-8 py-3 rounded-full bg-[#5C3D2E] border border-[#4A3226] shadow-md hover:shadow-xl text-[#F5E7DB] text-sm md:text-base font-medium transition-opacity duration-300 hover:scale-105 hover:bg-[#4A3226]"
          >
            <span>Explore All Products</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            >
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.span>
          </button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 pt-8 border-t border-[#E8D5B7]"
        ></motion.div>
      </div>

      {/* ANIMATION STYLES */}
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
          animation: scroll 30s linear infinite;
        }

        /* Smooth hover effect without stopping animation */
        .animate-scroll:hover {
          animation-play-state: running;
        }
      `}</style>
    </section>
  );
};

export default CategorySlider;
