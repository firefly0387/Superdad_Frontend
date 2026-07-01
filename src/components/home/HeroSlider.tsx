import { useState, useEffect, useRef, type SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroCarousel } from "@/utils/api";
import type { HeroItem, HeroResponse } from "@/types/hero";

const HeroSlider = () => {
  const [slides, setSlides] = useState<HeroItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch data
  useEffect(() => {
    setLoading(true);
    getHeroCarousel()
      .then((res) => {       
        // Handle different response structures
        let slidesData: (HeroResponse & any[]) | SetStateAction<HeroItem[]> = [];
        if (Array.isArray(res)) {
          slidesData = res;
        } else if (res?.results && Array.isArray(res.results)) {
          slidesData = res.results;
        } else if (res?.results && Array.isArray(res.results)) {
          slidesData = res.results;
        } else {
          slidesData = [];
        }
        
        setSlides(slidesData);
      })
      .catch((err) => {
        console.error("Error fetching hero carousel:", err);
        setSlides([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Auto slide (pause on hover)
  useEffect(() => {
    if (slides.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides, isPaused]);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) next(); // swipe left
    if (diff < -50) prev(); // swipe right
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full min-h-screen bg-[#f5e7db] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8B6914] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#795548]">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  // No slides state
  if (slides.length === 0) {
    return (
      <div className="relative w-full min-h-screen bg-[#f5e7db] flex items-center justify-center">
        <p className="text-[#795548] text-lg">No slides available</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Track (translate instead of fade) */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full shrink-0 relative">
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              loading={current === 0 ? "eager" : "lazy"}
              fetchPriority={current === 0 ? "high" : "low"}
              width={1920}
              height={1080}
              decoding="async"
              className="w-full h-screen object-cover"
            />

            {/* Gradient overlay (premium look) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h1 className="text-4xl md:text-6xl font-bold">{slide.title}</h1>

              <div
                className="mt-4 text-lg md:text-xl max-w-md"
                dangerouslySetInnerHTML={{ __html: slide.description }}
              />

              <button className="mt-6 px-6 py-3 bg-white text-black rounded-full hover:scale-105 transition">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controls - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full backdrop-blur hover:bg-white transition z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full backdrop-blur hover:bg-white transition z-10"
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition ${
                  current === i ? "bg-white w-6" : "bg-white/50 w-2.5"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSlider;