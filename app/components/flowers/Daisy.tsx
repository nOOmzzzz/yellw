'use client';

import React from 'react';

export default function Daisy({ isBlooming }: { isBlooming: boolean }) {
  // 28 fine radiating petals
  const petals = Array.from({ length: 28 }, (_, i) => (i * 360) / 28);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-transform duration-700 ${
        isBlooming ? 'animate-sway' : ''
      }`}
    >
      <svg
        viewBox="0 0 500 760"
        className="w-full h-full max-h-[82vh] overflow-visible drop-shadow-2xl"
      >
        <defs>
          {/* Stem Gradient */}
          <linearGradient id="daisyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          {/* Leaf Gradient */}
          <linearGradient id="daisyLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="70%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>

          {/* Daisy Petal Gradient */}
          <linearGradient id="daisyPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Center Button Radial Gradient */}
          <radialGradient id="daisyCenterGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#eab308" />
            <stop offset="90%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </radialGradient>

          {/* Daisy Petal Path */}
          <path
            id="daisyPetalPath"
            d="M 0 0 C -9 -30, -11 -80, 0 -118 C 11 -80, 9 -30, 0 0 Z"
          />
        </defs>

        {/* --- STEM --- */}
        <g>
          <path
            d="M 250 760 C 245 610, 260 450, 250 280"
            fill="none"
            stroke="url(#daisyStemGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            style={{
              strokeDasharray: 520,
              strokeDashoffset: isBlooming ? 0 : 520,
              transition: 'stroke-dashoffset 2.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* --- LEAVES (SERRATED / LOBED) --- */}
        {/* Left Leaf */}
        <g
          transform="translate(247, 500)"
          style={{
            transformOrigin: '0 0',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-30deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.4, 0.64, 1) 0.9s',
          }}
        >
          <path
            d="M 0 0 C -35 -10, -70 5, -95 10 C -75 25, -90 35, -115 45 C -85 55, -45 40, 0 0 Z"
            fill="url(#daisyLeafGrad)"
            stroke="#14532d"
            strokeWidth="1.5"
          />
          <path
            d="M 0 0 C -40 20, -75 30, -110 43"
            fill="none"
            stroke="#bbf7d0"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </g>

        {/* Right Leaf */}
        <g
          transform="translate(253, 420)"
          style={{
            transformOrigin: '0 0',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(30deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.4, 0.64, 1) 1.2s',
          }}
        >
          <path
            d="M 0 0 C 35 -10, 70 5, 95 10 C 75 25, 90 35, 120 45 C 85 55, 45 40, 0 0 Z"
            fill="url(#daisyLeafGrad)"
            stroke="#14532d"
            strokeWidth="1.5"
          />
          <path
            d="M 0 0 C 40 20, 75 30, 115 43"
            fill="none"
            stroke="#bbf7d0"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </g>

        {/* --- DAISY FLOWER HEAD --- */}
        <g
          transform="translate(250, 280)"
          style={{
            transformOrigin: '250px 280px',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1)' : 'scale(0.15)',
            transition: 'all 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.25) 1.3s',
          }}
        >
          {/* Ambient Glow */}
          <circle
            cx="0"
            cy="0"
            r="135"
            fill="rgba(250, 204, 21, 0.25)"
            filter="blur(25px)"
          />

          {/* 28 Slender Radiant Petals */}
          {petals.map((angle, idx) => (
            <g
              key={`daisy-petal-${idx}`}
              transform={`rotate(${angle})`}
              style={{
                transformOrigin: '0 0',
                opacity: isBlooming ? 1 : 0,
                transform: isBlooming
                  ? `rotate(${angle}deg) scale(1)`
                  : `rotate(${angle}deg) scale(0.1)`,
                transition: `all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${1.5 + idx * 0.025}s`,
              }}
            >
              <use
                href="#daisyPetalPath"
                fill="url(#daisyPetalGrad)"
                filter="drop-shadow(0 2px 4px rgba(180, 83, 9, 0.25))"
              />
              <line
                x1="0"
                y1="-8"
                x2="0"
                y2="-100"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Central Button */}
          <circle
            cx="0"
            cy="0"
            r="42"
            fill="url(#daisyCenterGrad)"
            stroke="#a16207"
            strokeWidth="2.5"
            filter="drop-shadow(0 2px 8px rgba(161, 98, 7, 0.4))"
          />

          {/* Micro Stipples on center button */}
          {[10, 20, 30].map((radius, ringIdx) => {
            const count = 8 + ringIdx * 6;
            return (
              <g key={`daisy-ring-${ringIdx}`} opacity="0.6">
                {Array.from({ length: count }).map((_, dotIdx) => {
                  const rad = (dotIdx * 360) / count * (Math.PI / 180);
                  const cx = Math.cos(rad) * radius;
                  const cy = Math.sin(rad) * radius;
                  return (
                    <circle
                      key={`daisy-dot-${ringIdx}-${dotIdx}`}
                      cx={cx}
                      cy={cy}
                      r={1.2}
                      fill="#854d0e"
                    />
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
