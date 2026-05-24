const ProductsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#faf9f7] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">

        {/* HERO SKELETON */}
        <div className="h-28 w-full bg-gray-200 rounded-3xl" />

        {/* TOP BAR SKELETON */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="h-10 w-full md:w-80 bg-gray-200 rounded-xl" />
          <div className="h-10 w-40 bg-gray-200 rounded-xl" />
          <div className="h-10 w-28 bg-gray-200 rounded-xl hidden md:block" />
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

          {/* SIDEBAR SKELETON */}
          <div className="hidden lg:block space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded" />

            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-full bg-gray-200 rounded-xl" />
            ))}

            <div className="h-6 w-32 bg-gray-200 rounded mt-6" />

            <div className="h-10 w-full bg-gray-200 rounded-xl" />
            <div className="h-10 w-full bg-gray-200 rounded-xl" />
          </div>

          {/* CONTENT SKELETON */}
          <div className="space-y-5">

            {/* INFO BAR */}
            <div className="flex justify-between">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>

            {/* GRID SKELETON (YouTube style cards) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-4 space-y-4"
                >
                  <div className="h-56 w-full bg-gray-200 rounded-2xl" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-200 rounded-2xl" />
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center gap-2">
              <div className="h-10 w-10 bg-gray-200 rounded" />
              <div className="h-10 w-10 bg-gray-200 rounded" />
              <div className="h-10 w-10 bg-gray-200 rounded" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageSkeleton;