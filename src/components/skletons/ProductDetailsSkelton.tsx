const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f5e7db] pt-27.5 md:pt-30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* BACK BUTTON */}
        <div className="h-5 w-32 bg-[#D4C4A8]/50 rounded mb-8 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">

          {/* LEFT IMAGE SECTION */}
          <div>
            {/* Main Image */}
            <div className="h-100 md:h-125 w-full bg-[#D4C4A8]/40 rounded-2xl mb-4 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-[#D4C4A8]/40 rounded-xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT INFO SECTION */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="flex gap-2">
              <div className="h-6 w-24 bg-[#D4C4A8]/50 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>
              <div className="h-6 w-20 bg-[#D4C4A8]/50 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="h-10 w-full bg-[#D4C4A8]/50 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>
              <div className="h-10 w-3/4 bg-[#D4C4A8]/50 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>

            {/* Rating */}
            <div className="h-5 w-40 bg-[#D4C4A8]/50 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="h-10 w-60 bg-[#D4C4A8]/50 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>

            {/* Stock Status */}
            <div className="h-4 w-32 bg-[#D4C4A8]/50 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>

            {/* Colors Section */}
            <div className="space-y-3">
              <div className="h-4 w-20 bg-[#D4C4A8]/50 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-[#D4C4A8]/40 rounded-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <div className="h-4 w-20 bg-[#D4C4A8]/50 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#D4C4A8]/40 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
                <div className="w-10 h-6 bg-[#D4C4A8]/40 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
                <div className="w-10 h-10 bg-[#D4C4A8]/40 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <div className="h-12 w-full bg-[#D4C4A8]/50 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>
              <div className="h-12 w-full bg-[#D4C4A8]/50 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>

            {/* Delivery Info Cards */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center p-3">
                  <div className="w-10 h-10 mx-auto bg-[#D4C4A8]/40 rounded-full relative overflow-hidden mb-2">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  <div className="h-3 w-20 mx-auto bg-[#D4C4A8]/40 rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="border-t border-[#E8D5B7] pt-10 pb-8 space-y-4">
          <div className="h-8 w-40 bg-[#D4C4A8]/50 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-[#D4C4A8]/40 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>
            <div className="h-4 w-5/6 bg-[#D4C4A8]/40 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>
            <div className="h-4 w-4/6 bg-[#D4C4A8]/40 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>
            <div className="h-4 w-3/4 bg-[#D4C4A8]/40 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* PRODUCT HIGHLIGHTS SECTION */}
        <div className="border-t border-[#E8D5B7] py-8 space-y-4">
          <div className="h-8 w-56 bg-[#D4C4A8]/50 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 w-48 bg-[#D4C4A8]/40 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
                <div className="h-4 w-full bg-[#D4C4A8]/30 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="border-t border-[#E8D5B7] py-8 space-y-4">
          <div className="h-8 w-64 bg-[#D4C4A8]/50 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-[#E8D5B7] rounded-xl p-6 bg-white/40 relative overflow-hidden"
              >
                <div className="h-6 w-3/4 bg-[#D4C4A8]/40 rounded mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
                <div className="h-4 w-full bg-[#D4C4A8]/30 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="border-t border-[#E8D5B7] py-8 space-y-4">
          <div className="h-8 w-60 bg-[#D4C4A8]/50 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="border border-[#E8D5B7] rounded-xl p-6 bg-white/40 relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#D4C4A8]/40 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-[#D4C4A8]/40 rounded mb-2 relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                    <div className="h-3 w-24 bg-[#D4C4A8]/30 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  </div>
                </div>
                <div className="h-4 w-full bg-[#D4C4A8]/30 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add shimmer animation */}
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

export default ProductDetailsSkeleton;