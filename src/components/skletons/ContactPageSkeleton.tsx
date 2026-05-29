
const ContactPageSkeleton = () => {
  return (
    <section className="min-h-screen bg-[#f5e7db] py-16 md:py-20 pt-27.5 md:pt-30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top Intro Skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C3D2E]/10 mb-5">
            <div className="w-4 h-4 bg-[#D4C4A8]/50 rounded animate-pulse" />
            <div className="w-20 h-4 bg-[#D4C4A8]/50 rounded animate-pulse" />
            <div className="w-4 h-4 bg-[#D4C4A8]/50 rounded animate-pulse" />
          </div>

          <div className="h-10 w-64 bg-[#D4C4A8]/50 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-full max-w-lg mx-auto bg-[#D4C4A8]/40 rounded animate-pulse" />
          <div className="h-4 w-80 mx-auto bg-[#D4C4A8]/40 rounded mt-2 animate-pulse" />
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-[#D4C4A8]/40 rounded animate-pulse" />
            <div className="h-3 w-64 bg-[#D4C4A8]/40 rounded animate-pulse" />
          </div>

          <div className="w-16 h-0.5 bg-[#D4C4A8] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Content Skeleton */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          
          {/* Contact Info Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4C4A8]/40 animate-pulse" />
                  <div className="flex-1">
                    <div className="h-3 w-16 bg-[#D4C4A8]/50 rounded animate-pulse mb-2" />
                    <div className="h-4 w-32 bg-[#D4C4A8]/50 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}

            {/* Trust Badge Skeleton */}
            <div className="bg-[#5C3D2E]/5 rounded-2xl border border-[#E8D5B7] p-6 text-center">
              <div className="w-8 h-8 bg-[#D4C4A8]/40 rounded-lg mx-auto mb-2 animate-pulse" />
              <div className="h-3 w-40 bg-[#D4C4A8]/40 rounded mx-auto animate-pulse" />
              <div className="h-3 w-48 bg-[#D4C4A8]/40 rounded mx-auto mt-2 animate-pulse" />
            </div>
          </div>

          {/* Contact Form Skeleton */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6 md:p-8">
            <div className="h-7 w-40 bg-[#D4C4A8]/50 rounded mb-6 animate-pulse" />
            
            <div className="space-y-5">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-24 bg-[#D4C4A8]/50 rounded mb-2 animate-pulse" />
                  <div className="h-11 w-full bg-[#D4C4A8]/40 rounded-xl animate-pulse" />
                </div>
              ))}
              
              <div className="h-12 w-full bg-[#D4C4A8]/40 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Map Section Skeleton */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6">
            <div className="h-6 w-24 bg-[#D4C4A8]/50 rounded mx-auto mb-4 animate-pulse" />
            <div className="rounded-xl overflow-hidden h-64 bg-[#D4C4A8]/30 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPageSkeleton;