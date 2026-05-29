import { lazy, Suspense } from "react";

const HeroSlider = lazy(() => import("@/components/home/HeroSlider"));
const CategorySlider = lazy(() => import("@/components/home/CategorySlider"));
const TopRatedSection = lazy(() => import("@/components/home/TopRated"));
const Slogan = lazy(() => import("@/components/home/Slogan"));
const HotDealsSection = lazy(() => import("@/components/home/HotDeals"));
const Reviews = lazy(() => import("@/components/review/Reviews"));
const Faqs = lazy(() => import("@/components/faqs/Faqs"));
const InstagramSection = lazy(() => import("@/components/home/InstgramSection"));

const Home = () => {
  return (
    <div className="bg-[#faf9f7]">
      <Suspense fallback={<div className="h-screen" />}>
        <HeroSlider />
      </Suspense>

      <Suspense fallback={null}>
        <CategorySlider />
      </Suspense>

      <Suspense fallback={null}>
        <TopRatedSection />
      </Suspense>

      <Suspense fallback={null}>
        <Slogan />
      </Suspense>

      <Suspense fallback={null}>
        <HotDealsSection />
      </Suspense>

      <Suspense fallback={null}>
        <Reviews />
      </Suspense>

      <Suspense fallback={null}>
        <Faqs />
      </Suspense>

      <Suspense fallback={null}>
        <InstagramSection />
      </Suspense>
    </div>
  );
};

export default Home;