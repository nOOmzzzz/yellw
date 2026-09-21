'use client';

import React from 'react';

export default function Narcissus({ step = 4 }: { step?: number }) {
  const hasStem = step >= 1;
  const hasLeaves = step >= 2;
  const hasBud = step >= 3;
  const hasBloom = step >= 4;

  const petals = [0, 60, 120, 180, 240, 300];

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-transform duration-700 ${
        hasBloom ? 'animate-sway' : ''
      }`}
    >
      <svg
        suppressHydrationWarning
        viewBox="0 0 500 760"
        className="w-full h-full max-h-[82vh] overflow-visible drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="narcStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          <linearGradient id="narcLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="70%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>

          <linearGradient id="narcPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="40%" stopColor="#fde047" />
            <stop offset="85%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <radialGradient id="narcCoronaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="75%" stopColor="#f59e0b" />
            <stop offset="95%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef08a" />
          </radialGradient>
        </defs>

        {/* --- STEM --- */}
        <g>
          <path
            d="M 250 760 C 248 620, 245 440, 255 330 C 258 300, 252 280, 250 270"
            fill="none"
            stroke="url(#narcStemGrad)"
            strokeWidth="13"
            strokeLinecap="round"
            style={{
              strokeDasharray: 540,
              strokeDashoffset: hasStem ? 0 : 540,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* --- LEAVES --- */}
        <g
          style={{
            transformOrigin: '246px 650px',
            opacity: hasLeaves ? 1 : 0,
            transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.01) rotate(-15deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.3, 0.64, 1) 0.2s',
          }}
        >
          <path
            d="M 248 650 C 210 550, 160 420, 175 280 C 185 390, 220 540, 248 650 Z"
            fill="url(#narcLeafGrad)"
            stroke="#15803d"
            strokeWidth="1.2"
          />
        </g>

        <g
          style={{
            transformOrigin: '252px 610px',
            opacity: hasLeaves ? 1 : 0,
            transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.01) rotate(15deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.3, 0.64, 1) 0.3s',
          }}
        >
          <path
            d="M 250 610 C 290 520, 330 400, 320 290 C 310 390, 275 510, 250 610 Z"
            fill="url(#narcLeafGrad)"
            stroke="#15803d"
            strokeWidth="1.2"
          />
        </g>

        {/* --- FLOWER HEAD --- */}
        <g
          transform="translate(250, 270)"
          style={{
            transformOrigin: '250px 270px',
            opacity: hasBud ? 1 : 0,
            transform: hasBloom ? 'scale(1)' : hasBud ? 'scale(0.55)' : 'scale(0.01)',
            transition: 'all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.25) 0.3s',
          }}
        >
          {/* Ambient golden aura */}
          {hasBloom && (
            <circle
              cx="0"
              cy="0"
              r="150"
              fill="rgba(250, 204, 21, 0.3)"
              filter="blur(20px)"
            />
          )}

          {/* 6 Broad Pointed Star Petals */}
          {petals.map((angle, idx) => (
            <g
              key={`narc-petal-${idx}`}
              transform={`rotate(${angle})`}
              style={{
                transformOrigin: '0 0',
                opacity: hasBloom ? 1 : 0,
                transform: hasBloom
                  ? `rotate(${angle}deg) scale(1)`
                  : `rotate(${angle}deg) scale(0.05)`,
                transition: `all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${0.2 + idx * 0.04}s`,
              }}
            >
              <path
                d="M 0 0 C -35 -40, -45 -95, 0 -140 C 45 -95, 35 -40, 0 0 Z"
                fill="url(#narcPetalGrad)"
                filter="drop-shadow(0 3px 6px rgba(180, 83, 9, 0.25))"
              />
              <line
                x1="0"
                y1="-5"
                x2="0"
                y2="-125"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="1.5"
              />
            </g>
          ))}

          {/* Central Ruffled Trumpet Corona */}
          <g
            style={{
              transformOrigin: '0 0',
              opacity: hasBud ? 1 : 0,
              transform: hasBud ? 'scale(1)' : 'scale(0.1)',
              transition: 'all 1.2s cubic-bezier(0.34, 1.4, 0.64, 1) 0.3s',
            }}
          >
            <circle
              cx="0"
              cy="0"
              r="48"
              fill="url(#narcCoronaGrad)"
              stroke="#d97706"
              strokeWidth="3"
              filter="drop-shadow(0 3px 10px rgba(180, 83, 9, 0.5))"
              className={hasBud && !hasBloom ? 'animate-pulse' : ''}
            />

            {Array.from({ length: 16 }).map((_, rIdx) => {
              const rad = (rIdx * 360) / 16 * (Math.PI / 180);
              const cx = Math.round(Math.cos(rad) * 48 * 100) / 100;
              const cy = Math.round(Math.sin(rad) * 48 * 100) / 100;
              return (
                <circle
                  key={`ruffle-${rIdx}`}
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="#f59e0b"
                />
              );
            })}

            <circle cx="0" cy="0" r="28" fill="#78350f" opacity="0.45" />

            {[-8, 8, -6, 6].map((offset, sIdx) => (
              <circle
                key={`stamen-${sIdx}`}
                cx={offset}
                cy={sIdx % 2 === 0 ? -10 : 8}
                r="3"
                fill="#fef08a"
              />
            ))}
            <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
          </g>
        </g>
      </svg>
    </div>
  );
}
