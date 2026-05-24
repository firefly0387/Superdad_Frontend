const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#fdf8f5] animate-pulse">
      <div className="max-w-7xl mx-auto px-5 py-8 md:py-12">

        {/* BACK BUTTON */}
        <div className="h-5 w-32 bg-gray-200 rounded mb-8" />

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">

          {/* LEFT IMAGE SECTION */}
          <div>
            <div className="h-100 md:h-125 w-full bg-gray-200 rounded-3xl mb-4" />

            {/* thumbnails */}
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 rounded-xl"
                />
              ))}
            </div>
          </div>

          {/* RIGHT INFO SECTION */}
          <div className="space-y-6">

            {/* categories */}
            <div className="flex gap-2">
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>

            {/* title */}
            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-10 w-3/4 bg-gray-200 rounded" />

            {/* rating */}
            <div className="h-5 w-40 bg-gray-200 rounded" />

            {/* price */}
            <div className="h-10 w-60 bg-gray-200 rounded" />

            {/* stock */}
            <div className="h-4 w-32 bg-gray-200 rounded" />

            {/* quantity */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="w-10 h-6 bg-gray-200 rounded" />
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
            </div>

            {/* buttons */}
            <div className="flex gap-3">
              <div className="h-12 w-full bg-gray-200 rounded-full" />
              <div className="h-12 w-full bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="border-t border-[#e8ddd5] pt-10 pb-8 space-y-4">
          <div className="h-8 w-60 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>

        {/* DETAILS GRID */}
        <div className="border-t border-[#e8ddd5] py-8 space-y-4">
          <div className="h-8 w-60 bg-gray-200 rounded" />

          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-full bg-gray-200 rounded" />
          ))}
        </div>

        {/* FAQ */}
        <div className="border-t border-[#e8ddd5] py-8 space-y-4">
          <div className="h-8 w-72 bg-gray-200 rounded" />

          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 w-full bg-gray-200 rounded-2xl" />
          ))}
        </div>

        {/* REVIEWS */}
        <div className="border-t border-[#e8ddd5] py-8 space-y-4">
          <div className="h-8 w-72 bg-gray-200 rounded" />

          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-28 w-full bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;