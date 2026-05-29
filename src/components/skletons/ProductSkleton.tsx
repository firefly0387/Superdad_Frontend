const ProductsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f5e7db] pt-27.5 md:pt-30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        
        {/* HERO SKELETON with shimmer */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E8D5B7] bg-white/60 backdrop-blur-sm p-6 md:p-10">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <div className="flex gap-2">
                <div className="h-8 w-28 bg-[#D4C4A8]/50 rounded-full" />
                <div className="h-8 w-24 bg-[#D4C4A8]/50 rounded-full" />
              </div>
              <div className="space-y-3">
                <div className="h-12 w-full bg-[#D4C4A8]/40 rounded-lg" />
                <div className="h-12 w-3/4 bg-[#D4C4A8]/40 rounded-lg" />
              </div>
              <div className="h-20 w-full bg-[#D4C4A8]/30 rounded-lg" />
            </div>
            <div className="h-85 w-full bg-[#D4C4A8]/40 rounded-2xl" />
          </div>
        </div>

        {/* TOP BAR SKELETON */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="h-11 w-full md:w-80 bg-[#D4C4A8]/50 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-11 w-48 bg-[#D4C4A8]/50 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        {/* GRID SKELETON with cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-[#E8D5B7] bg-white/60 backdrop-blur-sm p-5 space-y-6">
              {/* Sidebar content skeletons */}
              <div className="space-y-4">
                <div className="h-6 w-32 bg-[#D4C4A8]/50 rounded" />
                <div className="h-10 w-full bg-[#D4C4A8]/40 rounded-xl" />
                <div className="h-10 w-full bg-[#D4C4A8]/40 rounded-xl" />
                <div className="h-10 w-full bg-[#D4C4A8]/40 rounded-xl" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm border border-[#E8D5B7] rounded-2xl overflow-hidden">
                  <div className="h-56 bg-[#D4C4A8]/40 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-[#D4C4A8]/50 rounded w-3/4 relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                    <div className="h-4 bg-[#D4C4A8]/50 rounded w-1/2 relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-[#D4C4A8]/50 rounded w-24 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                      <div className="h-6 bg-[#D4C4A8]/40 rounded-full w-16 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add shimmer animation to global CSS or in a style tag */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductsPageSkeleton;