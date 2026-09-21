'use client';

import React from 'react';

export default function GoldenButterflies({ active = true }: { active?: boolean }) {
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible z-20 select-none">
      {/* Butterfly 1: Left flutter */}
      <div
        className="absolute top-[22%] left-[18%] sm:left-[24%] transition-opacity duration-1000"
        style={{
          animation: 'flutterFloat1 9s ease-in-out infinite',
        }}
      >
        <div className="relative flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]">
          {/* Left Wing */}
          <svg
            viewBox="0 0 32 40"
            className="w-5 h-7 origin-right"
            style={{ animation: 'wingFlapLeft 0.38s ease-in-out infinite alternate' }}
          >
            <path
              d="M32 20 C24 8, 4 4, 2 14 C0 24, 18 24, 32 20 Z"
              fill="url(#butterflyGrad)"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
            <path
              d="M32 20 C22 24, 8 30, 10 38 C14 44, 26 30, 32 20 Z"
              fill="url(#butterflyGrad)"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
            {/* Wing veins */}
            <path d="M30 20 C20 16, 12 12, 6 15" stroke="rgba(255,255,255,0.6)" strokeWidth="0.6" fill="none" />
          </svg>

          {/* Body */}
          <div className="w-1 h-5 rounded-full bg-amber-900 shadow-sm z-10" />

          {/* Right Wing */}
          <svg
            viewBox="0 0 32 40"
            className="w-5 h-7 origin-left"
            style={{ animation: 'wingFlapRight 0.38s ease-in-out infinite alternate' }}
          >
            <path
              d="M0 20 C8 8, 28 4, 30 14 C32 24, 14 24, 0 20 Z"
              fill="url(#butterflyGrad)"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
            <path
              d="M0 20 C10 24, 24 30, 22 38 C18 44, 6 30, 0 20 Z"
              fill="url(#butterflyGrad)"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
            <path d="M2 20 C12 16, 20 12, 26 15" stroke="rgba(255,255,255,0.6)" strokeWidth="0.6" fill="none" />
          </svg>
        </div>
      </div>

      {/* Butterfly 2: Right flutter */}
      <div
        className="absolute top-[28%] right-[16%] sm:right-[22%] transition-opacity duration-1000"
        style={{
          animation: 'flutterFloat2 11s ease-in-out infinite 1.2s',
        }}
      >
        <div className="relative flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(253,224,71,0.7)] scale-90">
          {/* Left Wing */}
          <svg
            viewBox="0 0 32 40"
            className="w-5 h-7 origin-right"
            style={{ animation: 'wingFlapLeft 0.32s ease-in-out infinite alternate 0.1s' }}
          >
            <path
              d="M32 20 C24 8, 4 4, 2 14 C0 24, 18 24, 32 20 Z"
              fill="url(#butterflyGrad)"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
            <path
              d="M32 20 C22 24, 8 30, 10 38 C14 44, 26 30, 32 20 Z"
              fill="url(#butterflyGrad)"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
          </svg>

          {/* Body */}
          <div className="w-1 h-5 rounded-full bg-amber-900 shadow-sm z-10" />

          {/* Right Wing */}
          <svg
            viewBox="0 0 32 40"
            className="w-5 h-7 origin-left"
            style={{ animation: 'wingFlapRight 0.32s ease-in-out infinite alternate 0.1s' }}
          >
            <path
              d="M0 20 C8 8, 28 4, 30 14 C32 24, 14 24, 0 20 Z"
              fill="url(#butterflyGrad)"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
            <path
              d="M0 20 C10 24, 24 30, 22 38 C18 44, 6 30, 0 20 Z"
              fill="url(#butterflyGrad)"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Shared Gradient Definition for Butterflies */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="butterflyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#facc15" />
            <stop offset="85%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
