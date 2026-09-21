'use client';

import React from 'react';

export default function GoldenSeed({
  onClick,
  step,
  flowerName,
}: {
  onClick: () => void;
  step: number;
  flowerName: string;
}) {
  const stepHints = [
    '✨ Toca la semilla para plantar el tallo',
    '🌱 ¡El tallo brotó! Toca para desplegar las hojas',
    '🍃 ¡Crecieron las hojas! Toca para formar el capullo',
    '🌟 ¡El capullo está listo! Toca para hacer florecer',
    '💛 ¡Tu flor amarilla ha florecido con amor!',
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6 z-30 select-none animate-fadeIn">
      {/* Interactive Glowing Golden Seed */}
      <button
        type="button"
        onClick={onClick}
        aria-label="Tocar semilla amarilla"
        className="group relative flex items-center justify-center w-28 h-28 focus:outline-none cursor-pointer"
      >
        {/* Outer Pulsing Aura Rings */}
        <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-ping opacity-75 duration-1000" />
        <div className="absolute -inset-4 rounded-full bg-yellow-400/15 blur-2xl animate-pulse" />

        {/* Concentric Golden Waves */}
        <div className="absolute w-24 h-24 rounded-full border border-amber-300/40 animate-[spin_8s_linear_infinite]" />
        <div className="absolute w-20 h-20 rounded-full border border-yellow-200/50 animate-[spin_6s_linear_infinite_reverse]" />

        {/* Main Golden Pearl / Glowing Orb */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-100 shadow-[0_0_30px_8px_rgba(250,204,21,0.85)] group-hover:scale-115 group-active:scale-95 transition-all duration-300">
          <div className="w-5 h-5 rounded-full bg-white/90 blur-[1px] shadow-inner" />
          <span className="absolute text-xl group-hover:rotate-12 transition-transform">
            ✨
          </span>
        </div>

        {/* Floating Sparks */}
        <span className="absolute -top-2 left-4 text-xs animate-bounce text-yellow-200">✦</span>
        <span className="absolute -bottom-1 right-3 text-xs animate-bounce [animation-delay:0.3s] text-amber-200">✦</span>
        <span className="absolute top-8 -right-3 text-xs animate-bounce [animation-delay:0.5s] text-yellow-300">✦</span>
      </button>

      {/* Guide text & Progress Indicators */}
      <div className="text-center px-4 max-w-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2 shadow-sm">
          <span>Paso {step} de 4</span>
          <span>•</span>
          <span>{flowerName}</span>
        </div>
        <p className="text-sm sm:text-base font-medium text-amber-100/90 drop-shadow">
          {stepHints[step]}
        </p>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {[0, 1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === s
                  ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]'
                  : step > s
                  ? 'w-2 bg-amber-300/80'
                  : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
