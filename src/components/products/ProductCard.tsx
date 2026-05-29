import type { Product } from "../../types/product";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
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

  // Get the secondary image (add_image) if it exists
  const secondaryImage = product.add_image;
  const hasSecondaryImage = !!secondaryImage;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/60 backdrop-blur-sm border border-[#D4C4A8] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* IMAGE WRAPPER */}
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        className="relative cursor-pointer h-56 bg-[#f5e7db] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image */}
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            hasSecondaryImage && isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image (on hover) */}
        {hasSecondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.title} - alternate view`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          />
        )}

        {/* Rating Badge */}
        {product.average_rating && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm z-10">
            <Star size={12} fill="#C4A747" className="text-[#C4A747]" />
            <span className="text-xs text-[#3E2723] font-medium">
              {product.average_rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {product.discount_per && (
          <div className="absolute top-3 right-3 bg-[#3E2723] text-white px-2 py-1 rounded-full text-xs font-medium z-10">
            {product.discount_per}% OFF
          </div>
        )}

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h3 className="text-sm font-medium text-[#3E2723] line-clamp-2 leading-snug">
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-semibold text-[#3E2723]">
              Rs {Number(product.final_price || product.price).toLocaleString()}
            </p>
            {product.discount_per && (
              <p className="text-xs text-[#795548] line-through">
                Rs {Number(product.price).toLocaleString()}
              </p>
            )}
          </div>

          <span className="text-xs px-2 py-1 bg-[#f5e7db] rounded-full text-[#795548]">
            {product.quantity > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-[#3E2723] text-white text-sm py-2.5 rounded-xl hover:bg-[#2C1A16] transition-all"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>

          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="w-12 flex items-center justify-center bg-[#f5e7db] text-[#3E2723] rounded-xl hover:bg-[#E8D5B7] transition"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;