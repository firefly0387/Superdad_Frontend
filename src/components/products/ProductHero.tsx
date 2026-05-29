import { motion } from "framer-motion";
import { Sparkles, Package } from "lucide-react";

type Props = {
  totalCount: number;
  category?: string;
};

const ProductHero = ({ totalCount, category }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#D4C4A8] bg-white/60 backdrop-blur-sm shadow-sm p-6 md:p-10">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C4A747]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#D4C4A8]/20 rounded-full blur-3xl" />

      <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#3E2723] bg-[#f5e7db] px-3 py-1 rounded-full">
              <Package size={12} />
              {category ? `Category: ${category}` : "All Products"}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#3E2723] bg-[#f5e7db] px-3 py-1 rounded-full">
              <Sparkles size={12} />
              {totalCount} Products
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-light leading-tight text-[#3E2723]">
            Discover carefully selected{" "}
            <span className="font-semibold text-[#C4A747]">products</span>
          </h1>

          <p className="text-sm md:text-base text-[#795548] leading-7 max-w-lg">
            Explore high-quality items designed to bring simplicity, comfort,
            and elegance into your everyday life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-65 md:h-85 rounded-2xl overflow-hidden shadow-md"
        >
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3E2723]/20 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductHero;