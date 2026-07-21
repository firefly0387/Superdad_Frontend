import type { Product, Color } from "../../types/product";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    addToCart({
      ...product,
      quantity: 1,
      selectedColor,
    });

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

  const secondaryImage = product.add_image ?? undefined;
  const hasSecondaryImage = Boolean(secondaryImage);
  const hasColors = product.colors && product.colors.length > 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D4C4A8] bg-white/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      {/* IMAGE */}
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        className="relative h-56 cursor-pointer overflow-hidden bg-[#f5e7db]"
      >
        {/* Main Image */}
        <img
          src={product.image}
          alt={product.title}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
            hasSecondaryImage
              ? "opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-110"
              : "group-hover:scale-105"
          }`}
        />

        {/* Hover Image */}
        {hasSecondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.title} alternate`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 scale-110 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Rating */}
        {product.average_rating && (
          <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur">
            <Star
              size={12}
              fill="#C4A747"
              className="text-[#C4A747]"
            />
            <span className="text-xs font-medium text-[#3E2723]">
              {product.average_rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Discount */}
        {product.discount_per && (
          <div className="absolute right-3 top-3 z-20 rounded-full bg-[#3E2723] px-2 py-1 text-xs font-semibold text-white">
            {product.discount_per}% OFF
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="min-h-10 line-clamp-2 text-sm font-medium leading-snug text-[#3E2723]">
          {product.title}
        </h3>

        {/* Colors */}
        <div className="mt-2 min-h-8">
          {hasColors && (
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={(e) => handleColorSelect(color, e)}
                  title={color.name}
                  aria-label={color.name}
                  className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                    selectedColor?.id === color.id
                      ? "scale-110 border-[#8B6914] ring-2 ring-[#8B6914]/30"
                      : "border-white hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: color.hex_code,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-[#3E2723]">
              Rs{" "}
              {Number(
                product.final_price || product.price
              ).toLocaleString()}
            </p>

            {product.discount_per && (
              <p className="text-xs text-[#795548] line-through">
                Rs {Number(product.price).toLocaleString()}
              </p>
            )}
          </div>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              product.quantity > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.quantity <= 0}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white transition ${
              product.quantity > 0
                ? "bg-[#3E2723] hover:bg-[#2C1A16]"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            <ShoppingCart size={16} />
            {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="flex w-10 items-center justify-center rounded-xl bg-[#f5e7db] text-[#3E2723] transition hover:bg-[#E8D5B7]"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;