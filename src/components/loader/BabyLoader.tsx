const BabyLoader = () => {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0f0f14] overflow-hidden">

      {/* 🌫 soft ambient glow */}
      <div className="absolute w-80 h-80 bg-pink-500/10 blur-3xl rounded-full -top-25 -left-25" />
      <div className="absolute w-96 h-96 bg-purple-500/10 blur-3xl rounded-full -bottom-30 -right-30" />

      {/* 🌙 center loader card */}
      <div className="relative flex flex-col items-center justify-center">

        {/* ring loader */}
        <div className="relative w-20 h-20 flex items-center justify-center">

          <div className="absolute inset-0 rounded-full border border-white/10" />

          <div className="absolute inset-0 rounded-full border-t border-pink-400 animate-spin" />

          {/* baby icon */}
          <div className="text-2xl animate-bounce">🍼</div>
        </div>

        {/* text */}
        <p className="mt-6 text-white/70 text-sm font-light tracking-wide">
          preparing your world...
        </p>

        {/* soft dots */}
        <div className="flex gap-1 mt-4">
          <span className="w-2 h-2 bg-pink-400/70 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-pink-400/70 rounded-full animate-bounce delay-150" />
          <span className="w-2 h-2 bg-pink-400/70 rounded-full animate-bounce delay-300" />
        </div>

      </div>
    </div>
  );
};

export default BabyLoader;