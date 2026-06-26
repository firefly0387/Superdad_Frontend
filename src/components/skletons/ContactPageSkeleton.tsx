// ContactPageSkeleton.tsx (Simpler version)
import { Mail, Clock, Heart } from "lucide-react";

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

const ContactPageSkeleton = () => {
  return (
    <section className="min-h-screen bg-[#f5e7db] py-16 md:py-20 pt-27.5 md:pt-30">
      <style>{shimmerStyles}</style>
      
      {/* Background BLOBS */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#D4C4A8]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C4A747]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B6914]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Intro Skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C3D2E]/10 mb-5">
            <Mail size={14} className="text-[#5C3D2E]/30" />
            <div className="w-20 h-4 shimmer rounded"></div>
            <Heart size={14} className="text-[#5C3D2E]/30" />
          </div>

          <div className="space-y-3">
            <div className="h-10 md:h-12 w-64 mx-auto shimmer rounded"></div>
            <div className="h-10 md:h-12 w-48 mx-auto shimmer rounded"></div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-4 w-full max-w-md mx-auto shimmer rounded"></div>
            <div className="h-4 w-3/4 mx-auto shimmer rounded"></div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <Clock size={14} className="text-[#795548]/30" />
            <div className="h-3 w-64 shimmer rounded"></div>
          </div>

          <div className="w-16 h-0.5 bg-[#D4C4A8]/50 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6 shimmer-card"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#5C3D2E]/10 shimmer"></div>
                  <div className="flex-1">
                    <div className="h-3 w-12 shimmer rounded mb-1"></div>
                    <div className="h-4 w-32 shimmer rounded"></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust Badge */}
            <div className="bg-[#5C3D2E]/5 rounded-2xl border border-[#E8D5B7] p-6 text-center shimmer-card">
              <div className="w-8 h-8 shimmer rounded-full mx-auto mb-2"></div>
              <div className="h-3 w-40 shimmer rounded mx-auto mb-1"></div>
              <div className="h-3 w-48 shimmer rounded mx-auto"></div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6 md:p-8 shadow-sm">
            <div className="h-7 w-48 shimmer rounded mb-6"></div>

            <div className="space-y-5">
              {["name", "email", "contact", "message"].map((field) => (
                <div key={field}>
                  <div className={`h-4 ${field === 'contact' ? 'w-36' : 'w-28'} shimmer rounded mb-2`}></div>
                  <div className={`w-full ${field === 'message' ? 'h-28' : 'h-11'} rounded-xl shimmer`}></div>
                  {field === 'contact' && (
                    <div className="h-3 w-48 shimmer rounded mt-1"></div>
                  )}
                </div>
              ))}

              <div className="w-full h-11 rounded-xl shimmer"></div>
            </div>
          </div>
        </div>

        {/* Map Section Skeleton */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6">
            <div className="h-6 w-24 shimmer rounded mx-auto mb-4"></div>
            <div className="rounded-xl overflow-hidden h-64 bg-[#D4C4A8]/30 shimmer-card"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPageSkeleton;