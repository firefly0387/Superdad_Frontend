import { motion } from "framer-motion";
import { sloganData } from "@/data/slogan";

const Slogan = () => {
  const { badge, title, description, image } = sloganData;

  return (
    <section className="w-full py-10 md:py-10 bg-[#f5e7db] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section with Animations */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex justify-center items-center min-h-125"
            >
              {/* back soft blob - matching theme */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute w-[320px] h-80 md:w-107.5 md:h-107.5 rounded-[42%] bg-[#E8D5B7]/50 rotate-6"
              />

              {/* middle rounded diamond - warm white */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute w-60 h-60 md:w-[320px] md:h-80 rounded-[34%] bg-white/40 backdrop-blur-sm rotate-12 shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
              />

              {/* subtle floating circle - warm accent */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-14 right-12 w-10 h-10 rounded-full bg-[#D4C4A8]/60"
              />

              {/* subtle floating pill - warm accent */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-16 left-10 w-16 h-6 rounded-full bg-[#E8D5B7]/70 rotate-12"
              />

              {/* soft dots - warm colors */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-24 left-14 flex gap-2"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-[#D4C4A8]"
                />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="w-2 h-2 rounded-full bg-[#E8D5B7]"
                />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="w-2 h-2 rounded-full bg-[#D4C4A8]"
                />
              </motion.div>

              {/* image */}
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                src={image}
                alt={title}
                className="relative z-10 w-full max-w-md object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.06)]"
              />
            </motion.div>
          )}

          {/* Text Content Section - Matching TopRated styles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl text-center lg:text-left"
          >
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm text-[#8B6914] text-xs font-medium tracking-wider mb-5 shadow-sm"
              >
                {badge}
              </motion.div>
            )}

            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-5xl font-light text-[#5C3D2E] mb-4 tracking-tight"
              >
                {title}
              </motion.h2>
            )}

            {description?.map((item, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className={`text-[#8B6914]/70 text-sm md:text-base font-light leading-relaxed ${
                  index !== description.length - 1 ? "mb-4" : ""
                }`}
              >
                {item}
              </motion.p>
            ))}

            {/* soft trust note - matching TopRated card style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm border border-[#E8D5B7] cursor-default"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-2 h-2 rounded-full bg-[#8B6914]"
              />
              <p className="text-xs text-[#5C3D2E]/70 font-medium">
                Made with care for little moments that matter
              </p>
            </motion.div>
          </motion.div>
        </div>
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

export default Slogan;