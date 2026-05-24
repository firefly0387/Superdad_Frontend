import { useEffect, useState } from "react";
import { preloadImage } from "@/utils/preLoadImage";
import { getHotDeals, getProducts, getCategories } from "@/utils/api";

export const useAppBoot = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const boot = async () => {
      try {
        // 🔥 STEP 1: API PRELOAD (parallel)
        const [hotDeals, categories, products] = await Promise.all([
          getHotDeals(),
          getCategories(),
          getProducts({ page: 1 }),
        ]);

        // 🔥 STEP 2: IMAGE PRELOAD (CRITICAL)
        const images: string[] = [];

        // collect hero images safely
        const heroImages =
          products?.results?.slice(0, 5).map((p: any) => p.image) || [];

        images.push(...heroImages);

        await Promise.all(
          images
            .filter(Boolean)
            .map((src) => preloadImage(src))
        );

        // 🔥 STEP 3: small buffer for smooth UX
        await new Promise((r) => setTimeout(r, 300));

        setReady(true);
      } catch (err) {
        console.error("Boot failed:", err);
        setReady(true); // never block app forever
      }
    };

    boot();
  }, []);

  return { ready };
};