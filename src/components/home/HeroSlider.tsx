import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroCarousel } from "@/utils/api";
import type { HeroItem } from "@/types/hero";

const HeroSlider = () => {
  const [slides, setSlides] = useState<HeroItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);  

  // Fetch data
  useEffect(() => {
    getHeroCarousel()
      .then((res) => {
        console.log("API DATA:", res); // ✅ works
        setSlides(res.results);
      })
      .catch((err) => console.error(err));
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

  if (slides.length === 0) return null;

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
              className="w-full h-screen object-cover"
            />

            {/* 🔥 Gradient overlay (premium look) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

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

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full backdrop-blur"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full backdrop-blur"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition ${
              current === i ? "bg-white w-6" : "bg-white/50 w-2.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
