import { Heart, Users, Baby, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SkeletonLoader from "@/components/skletons/AboutSkleton";
import { useEffect, useState } from "react";
import SEO from "@/components/seo/seo";

const floating = {
  animate: { y: [0, -10, 0] },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function AboutUs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }
  return (
    <>
      <SEO
        title="About Us"
        description="Learn more about SuperDad and our mission to provide quality baby products."
      />
      <div className="relative overflow-hidden bg-[#f5e7db]">
        {/* BACKGROUND BLOBS */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#D4C4A8]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C4A747]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B6914]/10 rounded-full blur-3xl" />
        </div>

        {/* HERO */}
        <section className="px-6 md:px-16 pt-27.5 md:pt-30 pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-[#E8D5B7] px-5 py-3 rounded-full shadow-lg">
                <Sparkles className="text-[#8B6914]" size={18} />
                <span className="text-sm font-medium text-[#5C3D2E]">
                  Modern Parenting Platform
                </span>
              </div>

              <h1 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
                Welcome to{" "}
                <span className="font-semibold text-[#8B6914]">Superdad</span>
              </h1>

              <p className="mt-6 md:mt-8 text-[#795548] leading-relaxed">
                Superdad is an online shopping platform dedicated to baby
                products, kids essentials, and modern parenting needs.
                <br />
                <br />
                We believe fathers are not just providers — they are caregivers,
                protectors, companions, and everyday heroes in their children's
                lives.
              </p>

              <button className="mt-8 md:mt-10 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-[#5C3D2E] text-white font-semibold shadow-lg hover:bg-[#4A3226] hover:scale-105 transition-all duration-300">
                Explore Products
              </button>
            </div>

            <div className="relative">
              <motion.div
                {...floating}
                className="absolute -top-10 -left-10 w-40 h-40 bg-[#C4A747]/20 rounded-full blur-3xl"
              />

              <div className="bg-white/40 backdrop-blur-2xl border border-[#E8D5B7] rounded-3xl md:rounded-[40px] p-4 shadow-xl">
                <img
                  src="/about-hero.jpg"
                  alt="Superdad"
                  className="rounded-2xl md:rounded-[32px] h-96 md:h-125 object-cover w-full"
                />

                <motion.div
                  {...floating}
                  className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-white/80 backdrop-blur-xl border border-[#E8D5B7] rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="bg-[#f5e7db] p-2 md:p-3 rounded-xl md:rounded-2xl">
                      <Heart className="text-[#8B6914]" size={20} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#3E2723]">
                        Family First
                      </h4>
                      <p className="text-xs md:text-sm text-[#795548]">
                        Built for modern families.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="px-6 md:px-16 py-16 md:py-28">
          <div className="max-w-6xl mx-auto text-center">
            <span className="text-[#8B6914] uppercase tracking-widest font-semibold text-sm">
              Our Mission
            </span>

            <h2 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-light">
              Helping Every Parent Become a
              <span className="font-semibold text-[#8B6914]">
                {" "}
                Super Parent
              </span>
            </h2>

            <p className="mt-6 md:mt-8 text-[#795548] leading-relaxed max-w-4xl mx-auto">
              Our mission is to strengthen the bond between parents and children
              by helping parents become more present, involved, and confident in
              their parenting journey.
            </p>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-20">
              {[
                {
                  title: "Equal Parenting",
                  icon: Users,
                  desc: "Supporting both mothers and fathers equally.",
                },
                {
                  title: "Trusted Products",
                  icon: Baby,
                  desc: "Carefully curated products for modern families.",
                },
                {
                  title: "Family Connection",
                  icon: Heart,
                  desc: "Helping families create meaningful moments together.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/40 backdrop-blur-2xl border border-[#E8D5B7] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#f5e7db] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="text-[#8B6914]" size={28} />
                  </div>

                  <h3 className="mt-5 md:mt-6 text-xl md:text-2xl font-semibold text-[#3E2723]">
                    {item.title}
                  </h3>

                  <p className="mt-3 md:mt-4 text-[#795548] leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VISION */}
        <section className="px-6 md:px-16 py-16 md:py-28 bg-white/20">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-[#8B6914] uppercase tracking-widest font-semibold text-sm">
              Our Vision
            </span>

            <h2 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-light">
              Nepal's Most Trusted{" "}
              <span className="font-semibold text-[#8B6914]">
                Parenting Platform
              </span>
            </h2>

            <p className="mt-6 md:mt-8 text-[#795548] leading-relaxed">
              We envision a future where parenting is shared equally, fathers
              participate confidently in childcare, and technology strengthens
              family relationships instead of reducing them.
            </p>
          </div>
        </section>

        {/* STORY */}
        <section className="px-6 md:px-16 py-16 md:py-28">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <span className="text-[#8B6914] uppercase tracking-widest font-semibold text-sm">
                Our Story
              </span>

              <h2 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-light">
                More Than{" "}
                <span className="font-semibold text-[#8B6914]">Ecommerce</span>
              </h2>

              <p className="mt-6 md:mt-8 text-[#795548] leading-relaxed">
                Superdad was born from a simple but powerful observation — many
                parents deeply want to spend quality time with their children,
                but modern life often gets in the way.
                <br />
                <br />
                We created Superdad not just to sell products, but to support
                modern parenting and encourage stronger emotional connections
                within families.
              </p>

              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-[#D4C4A8] border-2 border-white"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#795548]">
                  Trusted by{" "}
                  <span className="font-semibold text-[#3E2723]">5000+</span>{" "}
                  happy parents
                </p>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="bg-white/40 backdrop-blur-2xl border border-[#E8D5B7] rounded-3xl md:rounded-[40px] p-4 shadow-xl">
                <img
                  src="/our-story.jpg"
                  alt="Our Story"
                  className="rounded-2xl md:rounded-[32px] h-80 md:h-96 object-cover w-full"
                />
              </div>
              <motion.div
                {...floating}
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white/80 backdrop-blur-xl border border-[#E8D5B7] rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-[#f5e7db] p-2 md:p-3 rounded-xl md:rounded-2xl">
                    <Baby className="text-[#8B6914]" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3E2723]">Since 2024</h4>
                    <p className="text-xs md:text-sm text-[#795548]">
                      Empowering parents
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
