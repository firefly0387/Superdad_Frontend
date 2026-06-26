// SkeletonLoader.tsx
import { motion } from "framer-motion";

const floating = {
  animate: { y: [0, -10, 0] },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// Shimmer CSS animation
const shimmerStyles = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .shimmer {
    background: linear-gradient(
      90deg,
      rgba(212, 196, 168, 0.3) 0%,
      rgba(232, 213, 183, 0.6) 25%,
      rgba(212, 196, 168, 0.4) 50%,
      rgba(232, 213, 183, 0.3) 75%,
      rgba(212, 196, 168, 0.3) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 0.5rem;
  }
  
  .shimmer-rounded {
    border-radius: 9999px;
  }
  
  .shimmer-card {
    background: linear-gradient(
      110deg,
      rgba(232, 213, 183, 0.2) 0%,
      rgba(255, 245, 235, 0.5) 30%,
      rgba(212, 196, 168, 0.3) 70%,
      rgba(232, 213, 183, 0.2) 100%
    );
    background-size: 220% 100%;
    animation: shimmer 1.8s ease-in-out infinite;
  }
`;

export default function SkeletonLoader() {
  return (
    <div className="relative overflow-hidden bg-[#f5e7db] min-h-screen">
      <style>{shimmerStyles}</style>

      {/* BACKGROUND BLOBS */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#D4C4A8]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C4A747]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B6914]/10 rounded-full blur-3xl" />
      </div>

      {/* HERO SECTION SKELETON */}
      <section className="px-6 md:px-16 pt-27.5 md:pt-30 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <div>
            {/* Badge Skeleton */}
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-[#E8D5B7] px-5 py-3 rounded-full shadow-lg">
              <div className="w-4 h-4 shimmer rounded" />
              <div className="w-32 h-4 shimmer rounded" />
            </div>

            {/* Title Skeleton */}
            <div className="mt-8 space-y-3">
              <div className="h-12 md:h-16 w-full max-w-md shimmer rounded" />
              <div className="h-12 md:h-16 w-3/4 shimmer rounded" />
            </div>

            {/* Paragraph Skeleton */}
            <div className="mt-6 md:mt-8 space-y-2">
              <div className="h-4 w-full shimmer rounded" />
              <div className="h-4 w-full shimmer rounded" />
              <div className="h-4 w-5/6 shimmer rounded" />
              <div className="h-4 w-4/6 shimmer rounded mt-2" />
            </div>

            {/* Button Skeleton */}
            <div className="mt-8 md:mt-10 w-40 h-12 shimmer rounded-xl" />
          </div>

          {/* Right Column */}
          <div className="relative">
            <motion.div
              {...floating}
              className="absolute -top-10 -left-10 w-40 h-40 bg-[#C4A747]/20 rounded-full blur-3xl"
            />

            <div className="bg-white/40 backdrop-blur-2xl border border-[#E8D5B7] rounded-3xl md:rounded-[40px] p-4 shadow-xl">
              <div className="rounded-2xl md:rounded-[32px] h-96 md:h-125 w-full shimmer" />
            </div>

            {/* Floating Card Skeleton */}
            <motion.div
              {...floating}
              className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-white/80 backdrop-blur-xl border border-[#E8D5B7] rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-[#f5e7db] p-2 md:p-3 rounded-xl md:rounded-2xl">
                  <div className="w-5 h-5 shimmer rounded" />
                </div>
                <div>
                  <div className="h-4 w-20 shimmer rounded mb-1" />
                  <div className="h-3 w-16 shimmer rounded" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION SKELETON */}
      <section className="px-6 md:px-16 py-16 md:py-28">
        <div className="max-w-6xl mx-auto text-center">
          <div className="h-5 w-32 shimmer rounded-full mx-auto" />

          <div className="mt-5 space-y-3">
            <div className="h-10 md:h-14 w-full max-w-3xl mx-auto shimmer rounded" />
            <div className="h-10 md:h-14 w-2/3 mx-auto shimmer rounded" />
          </div>

          <div className="mt-6 md:mt-8">
            <div className="h-16 w-full max-w-4xl mx-auto shimmer rounded" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-20">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/40 backdrop-blur-2xl border border-[#E8D5B7] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#f5e7db] mx-auto shimmer" />
                <div className="mt-5 md:mt-6">
                  <div className="h-6 w-32 shimmer rounded-lg mx-auto" />
                </div>
                <div className="mt-3 md:mt-4">
                  <div className="h-4 w-40 shimmer rounded mx-auto" />
                  <div className="h-3 w-32 shimmer rounded mx-auto mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION SECTION SKELETON */}
      <section className="px-6 md:px-16 py-16 md:py-28 bg-white/20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="h-5 w-28 shimmer rounded-full mx-auto" />

          <div className="mt-5 space-y-3">
            <div className="h-10 md:h-14 w-full max-w-3xl mx-auto shimmer rounded" />
            <div className="h-10 md:h-14 w-2/3 mx-auto shimmer rounded" />
          </div>

          <div className="mt-6 md:mt-8">
            <div className="h-20 w-full max-w-4xl mx-auto shimmer rounded" />
          </div>
        </div>
      </section>

      {/* STORY SECTION SKELETON */}
      <section className="px-6 md:px-16 py-16 md:py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="order-2 lg:order-1">
            <div className="h-5 w-28 shimmer rounded-full" />

            <div className="mt-5 space-y-3">
              <div className="h-10 md:h-14 w-full max-w-md shimmer rounded" />
              <div className="h-10 md:h-14 w-2/3 shimmer rounded" />
            </div>

            <div className="mt-6 md:mt-8 space-y-2">
              <div className="h-4 w-full shimmer rounded" />
              <div className="h-4 w-full shimmer rounded" />
              <div className="h-4 w-5/6 shimmer rounded" />
              <div className="h-4 w-4/6 shimmer rounded mt-2" />
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full shimmer border-2 border-white" />
                ))}
              </div>
              <div className="h-4 w-32 shimmer rounded" />
            </div>
          </div>

          {/* Right Column */}
          <div className="relative order-1 lg:order-2">
            <div className="bg-white/40 backdrop-blur-2xl border border-[#E8D5B7] rounded-3xl md:rounded-[40px] p-4 shadow-xl">
              <div className="rounded-2xl md:rounded-[32px] h-80 md:h-96 w-full shimmer" />
            </div>

            <motion.div
              {...floating}
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white/80 backdrop-blur-xl border border-[#E8D5B7] rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-[#f5e7db] p-2 md:p-3 rounded-xl md:rounded-2xl">
                  <div className="w-5 h-5 shimmer rounded" />
                </div>
                <div>
                  <div className="h-4 w-20 shimmer rounded mb-1" />
                  <div className="h-3 w-16 shimmer rounded" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}