'use client';

import React from 'react';

export default function Daisy({ step = 4 }: { step?: number }) {
  const hasStem = step >= 1;
  const hasLeaves = step >= 2;
  const hasBud = step >= 3;
  const hasBloom = step >= 4;

  const petals = Array.from({ length: 28 }, (_, i) => (i * 360) / 28);

  return (
    <div
      className={`relative w-full h-full flex items-end justify-center origin-bottom transition-transform duration-700 ${
        hasBloom ? 'animate-sway' : ''
      }`}
    >
      <svg
        suppressHydrationWarning
        viewBox="0 0 500 760"
        className="w-auto h-full max-h-[70vh] sm:max-h-[75vh] overflow-visible drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="daisyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          <linearGradient id="daisyLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="70%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>

          <linearGradient id="daisyPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <radialGradient id="daisyCenterGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#eab308" />
            <stop offset="90%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </radialGradient>

          <path
            id="daisyPetalPath"
            d="M 0 0 C -9 -30, -11 -80, 0 -118 C 11 -80, 9 -30, 0 0 Z"
          />
        </defs>

        {/* --- GROUND MOUND --- */}
        <ellipse cx="250" cy="758" rx="80" ry="14" fill="#0c2310" opacity="0.8" />
        <ellipse cx="250" cy="758" rx="55" ry="8" fill="#14532d" opacity="0.6" />

        {/* --- STEM --- */}
        <g>
          <path
            d="M 250 760 C 245 610, 255 450, 250 280"
            fill="none"
            stroke="url(#daisyStemGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            style={{
              strokeDasharray: 520,
              strokeDashoffset: hasStem ? 0 : 520,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* --- LEAVES --- */}
        {/* Left Leaf: Anchor at (247, 500) */}
        <g transform="translate(247, 500)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasLeaves ? 1 : 0,
              transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(-30deg)',
              transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.2s',
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
        </g>

        {/* Right Leaf: Anchor at (253, 420) */}
        <g transform="translate(253, 420)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasLeaves ? 1 : 0,
              transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(30deg)',
              transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.3s',
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
        </g>

        {/* --- FLOWER HEAD: Anchor at exact stem tip (250, 280) --- */}
        <g transform="translate(250, 280)">
          {/* Calyx connection */}
          {hasStem && (
            <path
              d="M -16 8 C -10 25, 10 25, 16 8 C 8 14, -8 14, -16 8 Z"
              fill="#14532d"
            />
          )}

          {/* Dynamic Bloom Group */}
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasBud ? 1 : 0,
              transform: hasBloom ? 'scale(1)' : hasBud ? 'scale(0.55)' : 'scale(0.001)',
              transition: 'all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.25) 0.2s',
            }}
          >
            {/* Ambient Glow */}
            {hasBloom && (
              <circle
                cx="0"
                cy="0"
                r="135"
                fill="rgba(250, 204, 21, 0.25)"
                filter="blur(25px)"
              />
            )}

            {/* 28 Slender Radiant Petals */}
            {petals.map((angle, idx) => (
              <g
                key={`daisy-petal-${idx}`}
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: '0px 0px',
                  opacity: hasBloom ? 1 : 0,
                  transform: hasBloom
                    ? `scale(1)`
                    : `scale(0.01)`,
                  transition: `all 1.1s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${0.15 + idx * 0.02}s`,
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
              className={hasBud && !hasBloom ? 'animate-pulse' : ''}
            />

            {/* Micro Stipples on center button */}
            {[10, 20, 30].map((radius, ringIdx) => {
              const count = 8 + ringIdx * 6;
              return (
                <g key={`daisy-ring-${ringIdx}`} opacity="0.6">
                  {Array.from({ length: count }).map((_, dotIdx) => {
                    const rad = (dotIdx * 360) / count * (Math.PI / 180);
                    const cx = Math.round(Math.cos(rad) * radius * 100) / 100;
                    const cy = Math.round(Math.sin(rad) * radius * 100) / 100;
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
        </g>
      </svg>
    </div>
  );
}
