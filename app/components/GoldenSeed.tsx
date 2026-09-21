'use client';

import React from 'react';
import { BUILD_STEPS } from './types';

export default function GoldenSeed({
  onClick,
  step,
  flowerName,
}: {
  onClick: () => void;
  step: number;
  flowerName: string;
}) {
  const currentStepInfo = BUILD_STEPS[step] || BUILD_STEPS[0];

  return (
    <div className="flex flex-col items-center justify-center gap-6 z-30 select-none animate-fadeIn">
      {/* Interactive Glowing Golden Seed */}
      <button
        type="button"
        onClick={onClick}
        aria-label="Tocar semilla mágica para armar ramo"
        className="group relative flex items-center justify-center w-32 h-32 focus:outline-none cursor-pointer"
      >
        {/* Outer Pulsing Aura Rings */}
        <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-2xl animate-ping opacity-75 duration-1000" />
        <div className="absolute -inset-4 rounded-full bg-yellow-400/20 blur-3xl animate-pulse" />

        {/* Concentric Golden Waves */}
        <div className="absolute w-28 h-28 rounded-full border border-amber-300/40 animate-[spin_8s_linear_infinite]" />
        <div className="absolute w-24 h-24 rounded-full border border-yellow-200/50 animate-[spin_6s_linear_infinite_reverse]" />

        {/* Main Golden Pearl / Glowing Orb */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-100 shadow-[0_0_35px_10px_rgba(250,204,21,0.85)] group-hover:scale-115 group-active:scale-95 transition-all duration-300">
          <div className="w-6 h-6 rounded-full bg-white/90 blur-[1px] shadow-inner" />
          <span className="absolute text-2xl group-hover:rotate-12 transition-transform">
            {currentStepInfo.icon}
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
          <span>Paso {step} de 5</span>
          <span>•</span>
          <span>{flowerName}</span>
        </div>
        <h4 className="text-base sm:text-lg font-bold text-amber-200">
          {currentStepInfo.title}
        </h4>
        <p className="text-xs sm:text-sm font-medium text-amber-100/80 mt-1 drop-shadow">
          {currentStepInfo.action}
        </p>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {BUILD_STEPS.map((s) => (
            <div
              key={s.step}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === s.step
                  ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]'
                  : step > s.step
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
