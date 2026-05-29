
const CartPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f5e7db] py-10 pt-27.5 md:pt-30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Title Skeleton */}
        <div className="text-center mb-10">
          <div className="h-10 w-48 bg-[#D4C4A8]/50 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - Cart Items Skeleton */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-sm p-6">
            {/* Header */}
            <div className="hidden md:grid grid-cols-3 text-sm font-medium border-b border-[#E8D5B7] pb-4 mb-4">
              <div className="h-4 w-16 bg-[#D4C4A8]/50 rounded animate-pulse" />
              <div className="h-4 w-20 bg-[#D4C4A8]/50 rounded mx-auto animate-pulse" />
              <div className="h-4 w-16 bg-[#D4C4A8]/50 rounded ml-auto animate-pulse" />
            </div>

            <div className="space-y-6">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-[#E8D5B7] pb-6"
                >
                  {/* PRODUCT */}
                  <div className="flex gap-4 items-center">
                    {/* Image Skeleton */}
                    <div className="w-20 h-20 bg-[#D4C4A8]/40 rounded-xl animate-pulse" />
                    
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Title Skeleton */}
                      <div className="h-5 w-32 bg-[#D4C4A8]/50 rounded animate-pulse" />
                      {/* Price Skeleton */}
                      <div className="h-4 w-24 bg-[#D4C4A8]/40 rounded animate-pulse" />
                      {/* Color Skeleton */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-[#D4C4A8]/40 rounded-full animate-pulse" />
                        <div className="h-3 w-16 bg-[#D4C4A8]/40 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* QUANTITY Skeleton */}
                  <div className="flex md:justify-center">
                    <div className="flex items-center rounded-xl bg-[#f5e7db] p-1">
                      <div className="w-8 h-8 bg-[#D4C4A8]/40 rounded-lg animate-pulse" />
                      <div className="w-10 h-5 bg-[#D4C4A8]/40 rounded mx-1 animate-pulse" />
                      <div className="w-8 h-8 bg-[#D4C4A8]/40 rounded-lg animate-pulse" />
                    </div>
                  </div>

                  {/* SUBTOTAL Skeleton */}
                  <div className="flex md:block items-center justify-between">
                    <div className="h-6 w-24 bg-[#D4C4A8]/50 rounded animate-pulse" />
                    <div className="ml-4 md:ml-0 md:mt-2 w-8 h-8 bg-[#D4C4A8]/40 rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Cart Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] shadow-sm p-6 sticky top-24">
              {/* Title Skeleton */}
              <div className="h-7 w-32 bg-[#D4C4A8]/50 rounded mb-5 pb-3 animate-pulse" />

              {/* Summary Items */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-[#D4C4A8]/40 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-[#D4C4A8]/40 rounded animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-[#D4C4A8]/40 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-[#D4C4A8]/40 rounded animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-[#D4C4A8]/40 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-[#D4C4A8]/40 rounded animate-pulse" />
                </div>
              </div>

              {/* Total Skeleton */}
              <div className="flex justify-between border-t border-[#E8D5B7] pt-4 mt-4">
                <div className="h-6 w-16 bg-[#D4C4A8]/50 rounded animate-pulse" />
                <div className="h-6 w-28 bg-[#D4C4A8]/50 rounded animate-pulse" />
              </div>

              {/* Button Skeleton */}
              <div className="w-full mt-6 h-12 bg-[#D4C4A8]/40 rounded-xl animate-pulse" />

              {/* Trust Badges Skeleton */}
              <div className="mt-6 pt-4 border-t border-[#E8D5B7]">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="w-5 h-5 bg-[#D4C4A8]/40 rounded mx-auto animate-pulse" />
                      <div className="h-3 w-16 bg-[#D4C4A8]/40 rounded mx-auto mt-1 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Continue Shopping Button Skeleton */}
            <div className="w-full mt-4 h-11 bg-[#D4C4A8]/40 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;