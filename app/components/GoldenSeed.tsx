'use client';

import React, { useState } from 'react';
import { BUILD_STEPS } from './types';

// Deterministic particles to eliminate any SSR hydration discrepancy
const BURST_PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i * 360) / 24;
  const rad = (angle * Math.PI) / 180;
  const dist = 110 + (i % 4) * 35;
  return {
    id: i,
    angle,
    x: Math.round(Math.cos(rad) * dist),
    y: Math.round(Math.sin(rad) * dist),
    size: 4 + (i % 3) * 3,
    delay: (i % 6) * 0.03,
    color: i % 3 === 0 ? '#fef08a' : i % 3 === 1 ? '#fde047' : '#f59e0b',
  };
});

// Deterministic orbiting stars around the idle core
const ORBIT_STARS = [
  { id: 1, angle: 0, distance: 58, size: 4, speed: 6 },
  { id: 2, angle: 90, distance: 70, size: 5, speed: 8 },
  { id: 3, angle: 180, distance: 58, size: 3.5, speed: 6 },
  { id: 4, angle: 270, distance: 70, size: 4.5, speed: 8 },
  { id: 5, angle: 45, distance: 82, size: 3, speed: 12 },
  { id: 6, angle: 225, distance: 82, size: 3.5, speed: 12 },
];

export default function GoldenSeed({
  onClick,
  step,
  flowerName,
}: {
  onClick: () => void;
  step: number;
  flowerName: string;
}) {
  const [isBursting, setIsBursting] = useState(false);
  const currentStepInfo = BUILD_STEPS[step] || BUILD_STEPS[0];

  // Synthesize a magical golden harp chime on click
  const playMagicalChime = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      // Melodic ascending arpeggio (C5, E5, G5, B5, D6, G6)
      const notes = [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        // Soft bell-like envelope
        gain.gain.setValueAtTime(0.0001, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.75);
      });
    } catch {
      // Audio not permitted, proceed silently
    }
  };

  const handleTrigger = () => {
    if (isBursting) return;
    setIsBursting(true);
    playMagicalChime();

    // Trigger step transition after the burst reaches full impact
    setTimeout(() => {
      onClick();
    }, 700);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-7 z-30 select-none animate-fadeIn">
      {/* Interactive Glowing Golden Seed Container */}
      <div className="relative flex items-center justify-center w-72 h-72">
        {/* Shockwave Rings on click */}
        {isBursting && (
          <>
            <div
              className="absolute inset-0 m-auto w-24 h-24 rounded-full border-2 border-yellow-200 pointer-events-none"
              style={{ animation: 'shockwaveFast 0.75s cubic-bezier(0.1, 0.9, 0.2, 1) forwards' }}
            />
            <div
              className="absolute inset-0 m-auto w-24 h-24 rounded-full border-2 border-amber-400 pointer-events-none"
              style={{ animation: 'shockwaveFast 0.75s cubic-bezier(0.1, 0.9, 0.2, 1) 0.08s forwards' }}
            />
            <div
              className="absolute inset-0 m-auto w-24 h-24 rounded-full border-2 border-amber-300 pointer-events-none"
              style={{ animation: 'shockwaveFast 0.75s cubic-bezier(0.1, 0.9, 0.2, 1) 0.16s forwards' }}
            />

            {/* Radiant Screen-wide Flash */}
            <div className="absolute inset-0 m-auto w-56 h-56 rounded-full bg-yellow-300/40 blur-3xl animate-ping pointer-events-none" />

            {/* Golden Radial Spark Explosion */}
            {BURST_PARTICLES.map((p) => (
              <div
                key={`burst-spark-${p.id}`}
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px 3px ${p.color}`,
                  transform: `translate(${p.x}px, ${p.y}px) scale(0)`,
                  opacity: 0,
                  transition: `all 0.65s cubic-bezier(0.12, 0.8, 0.32, 1) ${p.delay}s`,
                }}
              />
            ))}
          </>
        )}

        {/* Floating Gentle Idle Assembly */}
        <button
          type="button"
          onClick={handleTrigger}
          disabled={isBursting}
          aria-label="Tocar semilla mágica para despertar tu ramo"
          className="group relative flex items-center justify-center w-48 h-48 focus:outline-none cursor-pointer"
          style={{ animation: isBursting ? undefined : 'floatGentle 4.5s ease-in-out infinite' }}
        >
          {/* Deep Ambient Nebula Glow */}
          <div
            className="absolute inset-0 rounded-full bg-amber-400/25 blur-3xl group-hover:bg-amber-400/45 transition-all duration-700 pointer-events-none"
            style={{ animation: 'pulseGlow 3.5s ease-in-out infinite' }}
          />
          <div className="absolute -inset-6 rounded-full bg-yellow-300/20 blur-2xl animate-pulse pointer-events-none" />

          {/* Concentric Celestial Orbit Rings */}
          <div
            className="absolute w-44 h-44 rounded-full border border-amber-300/35 group-hover:border-amber-200/60 transition-colors pointer-events-none"
            style={{ animation: 'orbitSpin 10s linear infinite' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-yellow-200 shadow-[0_0_8px_rgba(254,240,138,0.9)]" />
          </div>

          <div
            className="absolute w-36 h-36 rounded-full border border-dashed border-yellow-200/45 group-hover:border-yellow-100/70 transition-colors pointer-events-none"
            style={{ animation: 'orbitSpin 7s linear infinite reverse' }}
          >
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
          </div>

          <div
            className="absolute w-28 h-28 rounded-full border border-amber-400/50 pointer-events-none"
            style={{ animation: 'orbitSpin 4.5s linear infinite' }}
          />

          {/* Orbiting Golden Star Motes */}
          {!isBursting &&
            ORBIT_STARS.map((star) => (
              <div
                key={`orbit-star-${star.id}`}
                className="absolute inset-0 m-auto pointer-events-none"
                style={{
                  width: `${star.distance * 2}px`,
                  height: `${star.distance * 2}px`,
                  animation: `orbitSpin ${star.speed}s linear infinite`,
                  animationDirection: star.id % 2 === 0 ? 'reverse' : 'normal',
                }}
              >
                <div
                  className="rounded-full bg-yellow-100 shadow-[0_0_8px_2px_rgba(254,240,138,1)]"
                  style={{
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
              </div>
            ))}

          {/* Main Golden Pearl / Radiant Glowing Orb */}
          <div
            className={`relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-100 shadow-[0_0_45px_14px_rgba(250,204,21,0.9)] group-hover:shadow-[0_0_65px_22px_rgba(254,240,138,1)] group-hover:scale-115 active:scale-95 transition-all duration-300 ${
              isBursting ? 'pointer-events-none' : ''
            }`}
            style={{
              animation: isBursting ? 'coreSupernova 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards' : undefined,
            }}
          >
            {/* Bespoke Botanical Emblem inside the core */}
            <svg
              viewBox="0 0 24 24"
              className="absolute w-8 h-8 text-amber-900 group-hover:scale-110 transition-transform duration-300 pointer-events-none drop-shadow-sm"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a5 5 0 0 0-5 5c0 3 5 8 5 8s5-5 5-8a5 5 0 0 0-5-5z" fill="rgba(254, 240, 138, 0.4)" />
              <circle cx="12" cy="7" r="2" fill="#78350f" />
              <path d="M12 15v7" />
              <path d="M9 19c1.5.5 3 0 3 0s1.5.5 3 0" />
            </svg>
          </div>

          {/* Clean Vector Starlight Flairs */}
          <svg className="absolute -top-2 left-6 w-4 h-4 text-amber-200/80 animate-pulse pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
          </svg>
          <svg className="absolute -bottom-1 right-6 w-3.5 h-3.5 text-yellow-300/80 animate-pulse [animation-delay:0.5s] pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
          </svg>
          <svg className="absolute top-12 -right-3 w-3 h-3 text-amber-300/60 animate-pulse [animation-delay:1s] pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
          </svg>
        </button>
      </div>

      {/* Guide text & Progress Indicators */}
      <div
        className={`text-center px-4 max-w-sm transition-opacity duration-300 ${
          isBursting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-200/80 text-[11px] font-medium tracking-wide mb-1.5 backdrop-blur-md">
          <span>{flowerName}</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-amber-50 tracking-wide">
          {currentStepInfo.title}
        </h3>

        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed font-light">
          {currentStepInfo.action}
        </p>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {BUILD_STEPS.map((s) => (
            <div
              key={s.step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s.step
                  ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(250,204,21,0.7)]'
                  : step > s.step
                  ? 'w-2 bg-amber-300/60'
                  : 'w-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
