import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getHotDeals } from "@/utils/api";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
  ShoppingCart,
  TrendingUp,
  Flame,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HotDealsSection() {
  const [hotDeals, setHotDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        setLoading(true);
        const data = await getHotDeals();
        setHotDeals(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotDeals();
  }, []);

  const handleAddToCart = (item: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItem = { 
      ...item, 
      quantity: 1
    };
    addToCart(cartItem);
    toast.success("Added to cart 🛒", {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#5C3D2E",
        color: "#f5e7db",
        border: "1px solid #8B6914",
      },
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % hotDeals.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + hotDeals.length) % hotDeals.length);
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#f5e7db]">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C3D2E]/10 text-[#5C3D2E] text-sm font-medium mb-5">
              <Flame size={14} />
              Hot Deals
              <Clock size={14} />
            </div>
            <h2 className="text-2xl md:text-4xl font-light text-[#5C3D2E] mb-4 tracking-tight">
              Limited Time Offers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#D4C4A8]/30 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (hotDeals.length === 0) return null;

  return (
    <section className="py-10 bg-[#f5e7db]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C3D2E]/10 text-[#5C3D2E] text-sm font-medium mb-5">
            <Flame size={14} />
            Hot Deals
            <Clock size={14} />
          </div>
          <h2 className="text-2xl md:text-4xl font-light text-[#5C3D2E] mb-3 tracking-tight">
            Limited Time Offers
          </h2>
          <p className="text-[#8B6914]/60 text-sm md:text-base max-w-2xl mx-auto font-light">
            Grab these deals before they're gone!
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {hotDeals.map((item, idx) => {
            const hasSecondaryImage = !!item.add_image;
            const isHovered = hoveredCard === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/products/${item.id}`)}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image with fixed aspect ratio and hover effect */}
                <div className="relative mb-4 overflow-hidden rounded-2xl bg-[#D4C4A8]/20 aspect-square">
                  {/* Main Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      hasSecondaryImage && isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                    }`}
                  />
                  
                  {/* Secondary Image (on hover) */}
                  {hasSecondaryImage && (
                    <img
                      src={item.add_image!}
                      alt={`${item.title} - alternate view`}
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                      }`}
                    />
                  )}

                  {/* Discount Badge */}
                  {item.discount_per && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-linear-to-r from-[#8B6914] to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md z-10">
                      <Flame size={10} />
                      {item.discount_per}% OFF
                    </div>
                  )}

                  {/* Quick Add Button */}
                  <div className="absolute inset-0 bg-[#5C3D2E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item, e);
                      }}
                      className="bg-white text-[#5C3D2E] px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-opacity duration-300 shadow-md"
                    >
                      <ShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-[#5C3D2E] font-medium mb-1.5 line-clamp-2 group-hover:text-[#8B6914] transition-colors min-h-12">
                    {item.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-lg font-semibold text-[#5C3D2E]">
                      Rs {Number(item.final_price || item.price).toLocaleString()}
                    </span>
                    {item.discount_per && (
                      <span className="text-sm text-[#8B6914]/50 line-through">
                        Rs {Number(item.price).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="block md:hidden relative">
          <div className="overflow-hidden px-2">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/products/${hotDeals[currentIndex].id}`)}
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl bg-[#D4C4A8]/20 aspect-square">
                  <img
                    src={hotDeals[currentIndex].image}
                    alt={hotDeals[currentIndex].title}
                    className="w-full h-full object-cover"
                  />

                  {/* Discount Badge */}
                  {hotDeals[currentIndex].discount_per && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-linear-to-r from-[#8B6914] to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md z-10">
                      <Flame size={10} />
                      {hotDeals[currentIndex].discount_per}% OFF
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(hotDeals[currentIndex], e);
                    }}
                    className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition z-10"
                  >
                    <ShoppingCart size={18} className="text-[#5C3D2E]" />
                  </button>
                </div>

                <div>
                  <h3 className="text-[#5C3D2E] font-medium mb-1.5 line-clamp-2 min-h-12">
                    {hotDeals[currentIndex].title}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold text-[#5C3D2E]">
                      Rs {Number(hotDeals[currentIndex].final_price || hotDeals[currentIndex].price).toLocaleString()}
                    </span>
                    {hotDeals[currentIndex].discount_per && (
                      <span className="text-sm text-[#8B6914]/50 line-through">
                        Rs {Number(hotDeals[currentIndex].price).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {hotDeals.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition z-20"
              >
                <ChevronLeft size={20} className="text-[#5C3D2E]" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition z-20"
              >
                <ChevronRight size={20} className="text-[#5C3D2E]" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-6">
            {hotDeals.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-opacity ${
                  currentIndex === idx ? "w-6 bg-[#5C3D2E]" : "w-1.5 bg-[#D4C4A8]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#5C3D2E] text-white text-sm font-medium hover:bg-[#4A3226] transition-opacity group"
          >
            <span>View All Hot Deals</span>
            <TrendingUp size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}