

const CheckoutPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f5e7db] py-10 pt-27.5 md:pt-30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Title Skeleton with Shimmer */}
        <div className="text-center mb-10">
          <div className="h-10 w-48 bg-[#D4C4A8]/50 rounded-lg mx-auto relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT FORM SKELETON */}
          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-sm p-6 md:p-8">
              <div className="h-7 w-32 bg-[#D4C4A8]/50 rounded mb-6 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="h-4 w-24 bg-[#D4C4A8]/50 rounded mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  <div className="h-11 w-full bg-[#D4C4A8]/40 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </div>
                <div>
                  <div className="h-4 w-24 bg-[#D4C4A8]/50 rounded mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  <div className="h-11 w-full bg-[#D4C4A8]/40 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </div>
              </div>

              {[...Array(4)].map((_, i) => (
                <div key={i} className="mt-4">
                  <div className="h-4 w-32 bg-[#D4C4A8]/50 rounded mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  <div className="h-11 w-full bg-[#D4C4A8]/40 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SUMMARY SKELETON */}
          <div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-sm p-6 md:p-8 sticky top-24">
              <div className="h-7 w-28 bg-[#D4C4A8]/50 rounded mb-5 pb-3 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              {/* Order Items Skeleton */}
              <div className="space-y-3">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex justify-between gap-4">
                    <div className="flex-1">
                      <div className="h-5 w-32 bg-[#D4C4A8]/50 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-2.5 h-2.5 bg-[#D4C4A8]/40 rounded-full" />
                        <div className="h-3 w-16 bg-[#D4C4A8]/40 rounded relative overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </div>
                      </div>
                      <div className="h-3 w-20 bg-[#D4C4A8]/40 rounded mt-1 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                    </div>
                    <div className="h-5 w-24 bg-[#D4C4A8]/50 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E8D5B7] my-5" />

              {/* Price Summary Skeleton */}
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-20 bg-[#D4C4A8]/40 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                    <div className="h-4 w-24 bg-[#D4C4A8]/40 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-t border-[#E8D5B7] pt-4 mt-4">
                <div className="h-6 w-16 bg-[#D4C4A8]/50 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
                <div className="h-6 w-28 bg-[#D4C4A8]/50 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>

              {/* Payment Methods Skeleton */}
              <div className="mt-6 space-y-3">
                <div className="h-4 w-32 bg-[#D4C4A8]/50 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
                
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-[#E8D5B7] bg-white/50 p-4">
                    <div className="w-4 h-4 bg-[#D4C4A8]/40 rounded-full" />
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-5 h-5 bg-[#D4C4A8]/40 rounded" />
                      <div className="h-4 w-32 bg-[#D4C4A8]/40 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button Skeleton */}
              <div className="w-full mt-6 h-12 bg-[#D4C4A8]/40 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              {/* Trust Badges Skeleton */}
              <div className="mt-6 pt-4 border-t border-[#E8D5B7]">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="w-5 h-5 bg-[#D4C4A8]/40 rounded mx-auto" />
                      <div className="h-3 w-16 bg-[#D4C4A8]/40 rounded mx-auto mt-1 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

export default CheckoutPageSkeleton;