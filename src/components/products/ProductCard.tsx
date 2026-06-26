import type { Product } from "../../types/product";
import type { Color } from "../../types/product";
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
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItem = { 
      ...product, 
      quantity: 1,
      selectedColor: selectedColor
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

  const handleColorSelect = (color: Color, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColor(color);
  };

  // Get the secondary image (add_image) if it exists
  const secondaryImage = product.add_image;
  const hasSecondaryImage = !!secondaryImage;
  const hasColors = product.colors && product.colors.length > 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/60 backdrop-blur-sm border border-[#D4C4A8] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* IMAGE WRAPPER - Fixed height */}
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        className="relative cursor-pointer h-56 bg-[#f5e7db] overflow-hidden shrink-0"
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
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      </div>

      {/* CONTENT - Fixed padding and consistent spacing */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title - Fixed height for consistency */}
        <h3 className="text-sm font-medium text-[#3E2723] line-clamp-2 leading-snug min-h-10">
          {product.title}
        </h3>

        {/* Color Selection - Fixed height area */}
        <div className="min-h-8 mt-1">
          {hasColors && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className="flex gap-1.5 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={(e) => handleColorSelect(color, e)}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-200 shrink-0 ${
                      selectedColor?.id === color.id
                        ? 'border-[#8B6914] scale-110 ring-1 ring-[#8B6914]/50'
                        : 'border-white/50 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex_code }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price and Stock - Row with consistent spacing */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-lg font-semibold text-[#3E2723] whitespace-nowrap">
              Rs {Number(product.final_price || product.price).toLocaleString()}
            </p>
            {product.discount_per && (
              <p className="text-xs text-[#795548] line-through whitespace-nowrap">
                Rs {Number(product.price).toLocaleString()}
              </p>
            )}
          </div>

          <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap shrink-0 ${
            product.quantity > 0 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {product.quantity > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>

        {/* BUTTONS - Fixed height row */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.quantity <= 0}
            className={`flex-1 flex items-center justify-center gap-2 text-white text-sm py-2.5 rounded-xl transition-all ${
              product.quantity > 0
                ? "bg-[#3E2723] hover:bg-[#2C1A16]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={16} className="shrink-0" />
            <span>{product.quantity > 0 ? "Add to Cart" : "Out of Stock"}</span>
          </button>

          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="w-10 flex items-center justify-center bg-[#f5e7db] text-[#3E2723] rounded-xl hover:bg-[#E8D5B7] transition shrink-0"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;