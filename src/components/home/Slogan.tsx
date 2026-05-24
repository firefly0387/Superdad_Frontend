import { sloganData } from "@/data/slogan";

const Slogan = () => {
  const { badge, title, description, image } = sloganData;

  return (
    <section className="w-full py-24 bg-linear-to-b from-[#fff7fb] via-white to-[#f7fbff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {image && (
            <div className="relative flex justify-center items-center min-h-125">
              {/* back soft blob */}
              <div className="absolute w-[320px] h-80 md:w-107.5 md:h-107.5 rounded-[42%] bg-[#ffe7dc] rotate-6" />

              {/* middle rounded diamond */}
              <div className="absolute w-60 h-60 md:w-[320px] md:h-80 rounded-[34%] bg-white/80 backdrop-blur-sm rotate-12 shadow-[0_12px_40px_rgba(0,0,0,0.04)]" />

              {/* subtle floating circle */}
              <div className="absolute top-14 right-12 w-10 h-10 rounded-full bg-[#ffd8c7]" />

              {/* subtle floating pill */}
              <div className="absolute bottom-16 left-10 w-16 h-6 rounded-full bg-[#fff1ea] rotate-12" />

              {/* soft dots */}
              <div className="absolute top-24 left-14 flex gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffd4c3]" />
                <span className="w-2 h-2 rounded-full bg-[#ffe7dc]" />
                <span className="w-2 h-2 rounded-full bg-[#ffd4c3]" />
              </div>

              {/* image */}
              <img
                src={image}
                alt={title}
                className="relative z-10 w-full max-w-md object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.06)]"
              />
            </div>
          )}

          <div className="max-w-xl">
            {badge && (
              <span className="inline-block px-4 py-2 rounded-full bg-[#fff0ea] text-[#d97757] text-xs font-semibold tracking-[0.18em] uppercase mb-6">
                {badge}
              </span>
            )}

            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2b2b2b] leading-[1.15] mb-6">
                {title}
              </h2>
            )}

            {description?.map((item, index) => (
              <p
                key={index}
                className={`text-[#6b6b6b] text-lg leading-8 ${
                  index !== description.length - 1 ? "mb-5" : ""
                }`}
              >
                {item}
              </p>
            ))}

            {/* soft trust note */}
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white shadow-sm border border-[#f4e7e1]">
              <div className="w-3 h-3 rounded-full bg-[#f4b59d]" />
              <p className="text-sm text-[#7a7a7a]">
                Made with care for little moments that matter
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slogan;
