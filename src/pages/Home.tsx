import { useEffect, useState } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import TopRatedSection from "@/components/home/TopRated";
import Slogan from "@/components/home/Slogan";
import HotDealsSection from "@/components/home/HotDeals";
import Reviews from "@/components/review/Reviews";
import CategorySlider from "@/components/home/CategorySlider";
import Faqs from "@/components/faqs/Faqs";
import InstagramSection from "@/components/home/InstgramSection";

import BabyLoader from "@/components/loader/BabyLoader";
import { preloadImage } from "@/utils/preLoadImage";

const Home = () => {
  const [ready, setReady] = useState(false);

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

useEffect(() => {
  const boot = async () => {
    try {
      const heroImage =
        "http://127.0.0.1:8000/media/hero/carousel/image/your-first.jpg";

      await Promise.all([
        preloadImage(heroImage),
        delay(1200), // ⬅️ minimum loader time
      ]);
    } finally {
      setReady(true);
    }
  };

  boot();
}, []);

  if (!ready) return <BabyLoader />;

  return (
    <div className="bg-[#faf9f7]">
      <HeroSlider />
      <TopRatedSection />
      <Slogan />
      <HotDealsSection />
      <Reviews />
      <CategorySlider />
      <Faqs />
      <InstagramSection />
    </div>
  );
};

export default Home;