import HomePageSkeleton from "@/components/skletons/HomePageSkeleton";
import { lazy, Suspense, useEffect, useState } from "react";

const HeroSlider = lazy(() => import("@/components/home/HeroSlider"));
const CategorySlider = lazy(() => import("@/components/home/CategorySlider"));
const TopRatedSection = lazy(() => import("@/components/home/TopRated"));
const Slogan = lazy(() => import("@/components/home/Slogan"));
const HotDealsSection = lazy(() => import("@/components/home/HotDeals"));
const Reviews = lazy(() => import("@/components/review/Reviews"));
const Faqs = lazy(() => import("@/components/faqs/Faqs"));
const InstagramSection = lazy(() => import("@/components/home/InstgramSection"));

const Home = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [, setHeroReady] = useState(false);
  const [showRemaining, setShowRemaining] = useState(false);

  useEffect(() => {
    // Show skeleton for minimum 1.5 seconds to avoid flash
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    // Hero slider will be visible after skeleton hides
    // Then load remaining components after 500ms delay
    const remainingTimer = setTimeout(() => {
      setShowRemaining(true);
    }, 2000);

    return () => {
      clearTimeout(skeletonTimer);
      clearTimeout(remainingTimer);
    };
  }, []);

  // Handle when hero slider is ready
  useEffect(() => {
    if (!showSkeleton) {
      // Small delay to ensure hero is visible
      const timer = setTimeout(() => {
        setHeroReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showSkeleton]);

  if (showSkeleton) {
    return <HomePageSkeleton onLoadingComplete={() => setShowSkeleton(false)} />;
  }

  return (
    <div className="bg-[#faf9f7]">
      {/* Hero Slider - Always visible first */}
      <Suspense
        fallback={
          <div className="h-100 md:h-125 lg:h-150 bg-[#f5e7db] animate-pulse flex items-center justify-center">
            <div className="text-[#8B6914]">Loading Hero...</div>
          </div>
        }
      >
        <HeroSlider />
      </Suspense>

      {/* Other components load progressively with fade-in effect */}
      <div
        className={`transition-all duration-700 ${
          showRemaining ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {showRemaining && (
          <>
            <Suspense
              fallback={
                <div className="py-8">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="h-8 w-48 shimmer rounded mx-auto mb-8" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="text-center">
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full shimmer mx-auto" />
                          <div className="h-4 w-20 shimmer rounded mx-auto mt-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              <CategorySlider />
            </Suspense>

            <Suspense
              fallback={
                <div className="py-8">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="h-8 w-56 shimmer rounded mx-auto mb-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 shimmer-card">
                          <div className="h-48 shimmer rounded-xl" />
                          <div className="h-4 w-3/4 shimmer rounded mt-3" />
                          <div className="h-4 w-1/2 shimmer rounded mt-2" />
                          <div className="h-6 w-24 shimmer rounded mt-3" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              <TopRatedSection />
            </Suspense>

            <Suspense fallback={null}>
              <Slogan />
            </Suspense>

            <Suspense
              fallback={
                <div className="py-8">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="h-8 w-48 shimmer rounded mx-auto mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-64 shimmer rounded-2xl" />
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              <HotDealsSection />
            </Suspense>

            <Suspense
              fallback={
                <div className="py-8">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="h-8 w-48 shimmer rounded mx-auto mb-8" />
                    <div className="grid md:grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shimmer-card">
                          <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div key={star} className="w-4 h-4 shimmer rounded" />
                            ))}
                          </div>
                          <div className="h-4 w-full shimmer rounded" />
                          <div className="h-4 w-5/6 shimmer rounded mt-2" />
                          <div className="flex items-center gap-3 mt-4 pt-4">
                            <div className="w-10 h-10 rounded-full shimmer" />
                            <div>
                              <div className="h-4 w-24 shimmer rounded" />
                              <div className="h-3 w-16 shimmer rounded mt-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              <Reviews />
            </Suspense>

            <Suspense
              fallback={
                <div className="py-8">
                  <div className="max-w-3xl mx-auto px-4">
                    <div className="h-8 w-32 shimmer rounded mx-auto mb-8" />
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shimmer-card">
                          <div className="h-5 w-40 shimmer rounded" />
                          <div className="h-4 w-full shimmer rounded mt-2" />
                          <div className="h-4 w-3/4 shimmer rounded mt-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              <Faqs />
            </Suspense>

            <Suspense
              fallback={
                <div className="py-8">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="h-8 w-48 shimmer rounded mx-auto mb-8" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square shimmer rounded-xl" />
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              <InstagramSection />
            </Suspense>
          </>
        )}
      </div>

      {/* Optional: Add loading indicator styles if not already present */}
      <style>{`
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
      `}</style>
    </div>
  );
};

export default Home;