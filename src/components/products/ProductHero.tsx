import { motion } from "framer-motion";

type Props = {
  totalCount: number;
  category?: string;
};

const ProductHero = ({ category }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-[34px] border bg-white/70 backdrop-blur-xl shadow-sm p-6 md:p-10">

      {/* SOFT BACKGROUND BLOBS */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40" />

      <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
            {category ? `Category: ${category}` : "All Products"}
          </span>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-gray-900">
            Discover carefully selected products for your lifestyle
          </h1>

          <p className="text-sm md:text-base text-gray-500 leading-7 max-w-lg">
            Explore high-quality items designed to bring simplicity, comfort,
            and elegance into your everyday life. Curated just for you.
          </p>

        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-65 md:h-85 rounded-[28px] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="hero"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductHero;