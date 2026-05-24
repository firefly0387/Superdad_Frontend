import { Heart, Users, Baby, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const floating = {
  animate: { y: [0, -10, 0] },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function AboutUs() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#fffafc] via-white to-[#f7fbff]">
      {/* BACKGROUND BLOBS */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
      </div>

      {/* HERO */}
      <section className="px-6 md:px-16 pt-24 pb-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-white/30 px-5 py-3 rounded-full shadow-lg">
              <Sparkles className="text-pink-500" size={18} />
              <span className="text-sm font-medium text-pink-600">
                Modern Parenting Platform
              </span>
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">
              Welcome to <span className="text-pink-500">Superdad</span>
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed">
              Superdad is an online shopping platform dedicated to baby
              products, kids essentials, and modern parenting needs.
              <br />
              <br />
              We believe fathers are not just providers — they are caregivers,
              protectors, companions, and everyday heroes in their children’s
              lives.
            </p>

            <button className="mt-10 px-8 py-4 rounded-2xl bg-pink-500 text-white font-semibold shadow-xl hover:scale-105 transition">
              Explore Products
            </button>
          </div>

          <div className="relative">
            <motion.div
              {...floating}
              className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl"
            />

            <div className="bg-white/30 backdrop-blur-2xl border border-white/30 rounded-[40px] p-4 shadow-xl">
              <img
                src="/about-hero.jpg"
                alt="Superdad"
                className="rounded-[32px] h-[550px] object-cover w-full"
              />

              <motion.div
                {...floating}
                className="absolute -bottom-6 -left-6 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-5 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 p-3 rounded-2xl">
                    <Heart className="text-pink-500" />
                  </div>

                  <div>
                    <h4 className="font-bold">Family First</h4>
                    <p className="text-sm text-gray-600">
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
      <section className="px-6 md:px-16 py-28">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-pink-500 uppercase tracking-widest font-semibold">
            Our Mission
          </span>

          <h2 className="mt-5 text-4xl md:text-6xl font-black">
            Helping Every Parent Become a
            <span className="text-pink-500"> Super Parent</span>
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Our mission is to strengthen the bond between parents and children
            by helping parents become more present, involved, and confident in
            their parenting journey.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
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
                className="bg-white/40 backdrop-blur-2xl border border-white/30 rounded-[36px] p-8 shadow-xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mx-auto">
                  <item.icon className="text-pink-500" size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="px-6 md:px-16 py-28">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-pink-500 uppercase tracking-widest font-semibold">
            Our Vision
          </span>

          <h2 className="mt-5 text-4xl md:text-6xl font-black">
            Nepal’s Most Trusted Parenting Platform
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            We envision a future where parenting is shared equally, fathers
            participate confidently in childcare, and technology strengthens
            family relationships instead of reducing them.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="px-6 md:px-16 py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="bg-white/30 backdrop-blur-2xl border border-white/30 rounded-[40px] p-4 shadow-xl">
              <img
                src="/our-story.jpg"
                alt="Our Story"
                className="rounded-[32px] h-[550px] object-cover w-full"
              />
            </div>
          </div>

          <div>
            <span className="text-pink-500 uppercase tracking-widest font-semibold">
              Our Story
            </span>

            <h2 className="mt-5 text-4xl md:text-6xl font-black">
              More Than Ecommerce
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed">
              Superdad was born from a simple but powerful observation — many
              parents deeply want to spend quality time with their children, but
              modern life often gets in the way.
              <br />
              <br />
              We created Superdad not just to sell products, but to support
              modern parenting and encourage stronger emotional connections
              within families.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}