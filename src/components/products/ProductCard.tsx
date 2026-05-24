import type { Product } from "../../types/product";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="
        group relative bg-white
        border border-gray-100
        rounded-3xl overflow-hidden
        shadow-sm hover:shadow-xl
        transition-all duration-300
      "
    >
      {/* IMAGE WRAPPER */}
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        className="relative cursor-pointer h-56 bg-gray-50 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="
            w-full h-full object-cover
            group-hover:scale-110
            transition duration-700 ease-out
          "
        />

        {/* subtle gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        {/* TITLE */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            Rs {Number(product.price).toLocaleString()}
          </p>

          {/* small badge feel (optional luxury touch) */}
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
            In stock
          </span>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 pt-2">
          {/* ADD TO CART */}
          <button
            onClick={() => {
              addToCart({ ...product, quantity: 1 });
              toast.success("Added to cart 🛒");
            }}
            className="
    flex-1 flex items-center justify-center gap-2
    bg-black text-white text-sm
    py-2.5 rounded-2xl
    hover:bg-gray-800 active:scale-[0.98]
    transition-all
  "
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>

          {/* VIEW */}
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="
              w-12 flex items-center justify-center
              bg-gray-100 text-gray-700
              rounded-2xl hover:bg-gray-200
              transition active:scale-[0.98]
            "
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
