// HomePageSkeletonCompact.tsx (with progress bar)
import { useEffect } from "react";

const shimmerStyles = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .shimmer {
    background: linear-gradient(
      90deg,
      rgba(212, 196, 168, 0.25) 0%,
      rgba(232, 213, 183, 0.6) 25%,
      rgba(212, 196, 168, 0.35) 50%,
      rgba(232, 213, 183, 0.25) 75%,
      rgba(212, 196, 168, 0.25) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
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

interface HomePageSkeletonProps {
  onLoadingComplete?: () => void;
}

const HomePageSkeleton = ({ onLoadingComplete }: HomePageSkeletonProps) => {

useEffect(() => {
  const timer = setTimeout(() => {
    onLoadingComplete?.();
  }, 1500); // same duration as Home.tsx

  return () => clearTimeout(timer);
}, [onLoadingComplete]);

  return (
    <div className="relative overflow-hidden bg-[#f5e7db] min-h-screen">
      <style>{shimmerStyles}</style>

      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#D4C4A8]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C4A747]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#8B6914]/10 rounded-full blur-3xl" />
      </div>

      {/* Hero skeleton */}
      <section className="pt-27.5 md:pt-30 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-[#E8D5B7] px-5 py-2 rounded-full">
              <div className="w-4 h-4 shimmer rounded-full" />
              <div className="w-32 h-4 shimmer rounded" />
            </div>
            <div className="mt-8 space-y-4">
              <div className="h-14 md:h-20 w-full max-w-lg shimmer rounded" />
              <div className="h-14 md:h-20 w-3/4 shimmer rounded" />
            </div>
            <div className="mt-6 space-y-2">
              <div className="h-4 w-full max-w-md shimmer rounded" />
              <div className="h-4 w-5/6 shimmer rounded" />
              <div className="h-4 w-4/6 shimmer rounded" />
            </div>
            <div className="mt-8 flex gap-4">
              <div className="w-40 h-12 shimmer rounded-xl" />
              <div className="w-40 h-12 shimmer rounded-xl" />
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/40 backdrop-blur-2xl border border-[#E8D5B7] rounded-3xl p-4">
              <div className="rounded-2xl h-80 md:h-96 w-full shimmer" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured products grid */}
      <section className="py-16 px-4 md:px-8 bg-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-56 shimmer rounded" />
            <div className="w-32 h-10 shimmer rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/60 rounded-2xl border border-[#E8D5B7] overflow-hidden">
                <div className="h-64 shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-3/4 shimmer rounded" />
                  <div className="h-4 w-1/2 shimmer rounded" />
                  <div className="flex justify-between">
                    <div className="h-6 w-20 shimmer rounded" />
                    <div className="w-10 h-10 shimmer rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageSkeleton;