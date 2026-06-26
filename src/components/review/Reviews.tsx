import { motion, type Variants } from "framer-motion";
import { Star, Heart, Quote } from "lucide-react";
import { reviews } from "@/data/reviews";

const Reviews = () => {
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

  return (
    <section className="w-full py-10 bg-[#f5e7db] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Heading with Animations - Matching TopRated styles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm text-[#8B6914] text-xs font-medium tracking-wider mb-5 shadow-sm"
          >
            <Star size={12} fill="currentColor" />
            REVIEWS
            <Star size={12} fill="currentColor" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-5xl font-light text-[#5C3D2E] mb-3 tracking-tight"
          >
            Loved by Parents{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              className="inline-block"
            >
              💛
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-[#8B6914]/70 text-sm md:text-base font-light"
          >
            Real feedback from happy families
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 border border-[#E8D5B7]"
            >
              {/* Decorative Quote Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="absolute top-4 right-4"
              >
                <Quote size={32} className="text-[#D4C4A8]/50" />
              </motion.div>

              {/* Stars */}
              <motion.div
                className="flex gap-1 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.2,
                      delay: 0.2 + i * 0.05 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Star
                      size={16}
                      className={`${
                        i < review.rating
                          ? "fill-[#8B6914] text-[#8B6914]"
                          : "text-[#D4C4A8]"
                      }`}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Comment */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="text-sm text-[#5C3D2E]/80 leading-relaxed mb-4 relative z-10"
              >
                "{review.comment}"
              </motion.p>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between mt-4 pt-3 border-t border-[#E8D5B7]"
              >
                <p className="text-sm font-medium text-[#5C3D2E]">
                  — {review.name}
                </p>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Heart size={14} className="text-rose-400 fill-rose-100" />
                </motion.div>
              </motion.div>

              {/* Subtle gradient overlay on hover - matching theme */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#E8D5B7]/0 to-[#E8D5B7]/0 group-hover:from-[#E8D5B7]/20 group-hover:to-[#E8D5B7]/10 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 pt-8 border-t border-[#E8D5B7]"
        ></motion.div>
      </div>
    </section>
  );
};

export default Reviews;
