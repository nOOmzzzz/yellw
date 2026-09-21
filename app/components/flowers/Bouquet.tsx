'use client';

import React from 'react';

export default function Bouquet({ isBlooming }: { isBlooming: boolean }) {
  // Reusable helper for flower head with yellow petals and golden center
  const renderBloomHead = (
    size: number,
    delaySec: number,
    isCenter: boolean = false
  ) => {
    const petalCount = isCenter ? 20 : 16;
    const angles = Array.from({ length: petalCount }, (_, i) => (i * 360) / petalCount);

    return (
      <g
        style={{
          transformOrigin: '0 0',
          opacity: isBlooming ? 1 : 0,
          transform: isBlooming ? 'scale(1)' : 'scale(0.1)',
          transition: `all 1.7s cubic-bezier(0.175, 0.885, 0.32, 1.25) ${delaySec}s`,
        }}
      >
        {/* Ambient Glow */}
        <circle
          cx="0"
          cy="0"
          r={size * 1.6}
          fill="rgba(250, 204, 21, 0.35)"
          filter="blur(16px)"
        />

        {/* Petals */}
        {angles.map((angle, idx) => (
          <g
            key={`bouquet-petal-${idx}`}
            transform={`rotate(${angle})`}
            style={{
              transformOrigin: '0 0',
              opacity: isBlooming ? 1 : 0,
              transform: isBlooming ? `rotate(${angle}deg) scale(1)` : `rotate(${angle}deg) scale(0.1)`,
              transition: `all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.15 + idx * 0.02}s`,
            }}
          >
            <path
              d={`M 0 0 C -${size * 0.22} -${size * 0.35}, -${size * 0.22} -${size * 0.85}, 0 -${size * 1.15} C ${size * 0.22} -${size * 0.85}, ${size * 0.22} -${size * 0.35}, 0 0 Z`}
              fill="url(#bouquetPetalGrad)"
              filter="drop-shadow(0 2px 4px rgba(180, 83, 9, 0.3))"
            />
            <line
              x1="0"
              y1={`-${size * 0.1}`}
              x2="0"
              y2={`-${size * 0.95}`}
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="1.2"
            />
          </g>
        ))}

        {/* Inner secondary petal layer for depth */}
        {angles.map((angle, idx) => (
          <g
            key={`bouquet-inner-petal-${idx}`}
            transform={`rotate(${angle + 180 / petalCount})`}
            style={{
              transformOrigin: '0 0',
              opacity: isBlooming ? 0.9 : 0,
              transform: isBlooming
                ? `rotate(${angle + 180 / petalCount}deg) scale(0.78)`
                : `rotate(${angle + 180 / petalCount}deg) scale(0.1)`,
              transition: `all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.35 + idx * 0.02}s`,
            }}
          >
            <path
              d={`M 0 0 C -${size * 0.2} -${size * 0.35}, -${size * 0.2} -${size * 0.85}, 0 -${size * 1.1} C ${size * 0.2} -${size * 0.85}, ${size * 0.2} -${size * 0.35}, 0 0 Z`}
              fill="url(#bouquetInnerPetalGrad)"
            />
          </g>
        ))}

        {/* Central Core Receptacle */}
        <circle
          cx="0"
          cy="0"
          r={size * 0.42}
          fill="url(#bouquetCoreGrad)"
          stroke="#b45309"
          strokeWidth="2.5"
          filter="drop-shadow(0 2px 8px rgba(245, 158, 11, 0.6))"
        />

        {/* Center Seed Dots */}
        {[0.15, 0.28].map((rFrac, rIdx) => {
          const dots = 7 + rIdx * 6;
          return (
            <g key={`core-ring-${rIdx}`}>
              {Array.from({ length: dots }).map((_, dIdx) => {
                const rad = (dIdx * 360) / dots * (Math.PI / 180);
                const cx = Math.cos(rad) * (size * rFrac);
                const cy = Math.sin(rad) * (size * rFrac);
                return (
                  <circle
                    key={`dot-${rIdx}-${dIdx}`}
                    cx={cx}
                    cy={cy}
                    r={size * 0.035}
                    fill={rIdx === 1 ? '#fef08a' : '#d97706'}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-transform duration-700 ${
        isBlooming ? 'animate-sway' : ''
      }`}
    >
      <svg
        viewBox="0 0 600 780"
        className="w-full h-full max-h-[82vh] overflow-visible drop-shadow-2xl"
      >
        <defs>
          {/* Stem Gradient */}
          <linearGradient id="bouquetStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Leaf Gradient */}
          <linearGradient id="bouquetLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>

          {/* Golden Yellow Outer Petals */}
          <linearGradient id="bouquetPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="75%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#fffbeb" />
          </linearGradient>

          {/* Warm Amber Inner Petals */}
          <linearGradient id="bouquetInnerPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>

          {/* Center Core Gradient */}
          <radialGradient id="bouquetCoreGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>

          {/* Ribbon Gradient */}
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* --- STEMS (3 INTERTWINED STEMS) --- */}
        {/* Left Arching Stem */}
        <path
          d="M 300 760 C 290 640, 200 480, 160 360"
          fill="none"
          stroke="url(#bouquetStemGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          style={{
            strokeDasharray: 550,
            strokeDashoffset: isBlooming ? 0 : 550,
            transition: 'stroke-dashoffset 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s',
          }}
        />

        {/* Right Arching Stem */}
        <path
          d="M 300 760 C 310 640, 400 480, 440 360"
          fill="none"
          stroke="url(#bouquetStemGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          style={{
            strokeDasharray: 550,
            strokeDashoffset: isBlooming ? 0 : 550,
            transition: 'stroke-dashoffset 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s',
          }}
        />

        {/* Center Tall Stem */}
        <path
          d="M 300 760 C 298 620, 296 420, 300 230"
          fill="none"
          stroke="url(#bouquetStemGrad)"
          strokeWidth="13"
          strokeLinecap="round"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: isBlooming ? 0 : 600,
            transition: 'stroke-dashoffset 2.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />

        {/* --- LEAVES ALONG STEMS --- */}
        {/* Left lower leaf */}
        <g
          transform="translate(260, 560)"
          style={{
            transformOrigin: '0 0',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-30deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.4, 0.64, 1) 0.9s',
          }}
        >
          <path
            d="M 0 0 C -45 -10, -90 10, -115 50 C -75 60, -35 40, 0 0 Z"
            fill="url(#bouquetLeafGrad)"
            stroke="#14532d"
            strokeWidth="1.5"
          />
        </g>

        {/* Right lower leaf */}
        <g
          transform="translate(340, 560)"
          style={{
            transformOrigin: '0 0',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(30deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.4, 0.64, 1) 1.0s',
          }}
        >
          <path
            d="M 0 0 C 45 -10, 90 10, 115 50 C 75 60, 35 40, 0 0 Z"
            fill="url(#bouquetLeafGrad)"
            stroke="#14532d"
            strokeWidth="1.5"
          />
        </g>

        {/* Left upper leaf */}
        <g
          transform="translate(190, 440)"
          style={{
            transformOrigin: '0 0',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-20deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.4, 0.64, 1) 1.2s',
          }}
        >
          <path
            d="M 0 0 C -40 -15, -75 0, -95 35 C -60 45, -30 30, 0 0 Z"
            fill="url(#bouquetLeafGrad)"
            stroke="#14532d"
            strokeWidth="1.5"
          />
        </g>

        {/* Right upper leaf */}
        <g
          transform="translate(410, 440)"
          style={{
            transformOrigin: '0 0',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(20deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.4, 0.64, 1) 1.3s',
          }}
        >
          <path
            d="M 0 0 C 40 -15, 75 0, 95 35 C 60 45, 30 30, 0 0 Z"
            fill="url(#bouquetLeafGrad)"
            stroke="#14532d"
            strokeWidth="1.5"
          />
        </g>

        {/* Center stem leaves */}
        <g
          transform="translate(298, 410)"
          style={{
            transformOrigin: '0 0',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1)' : 'scale(0)',
            transition: 'all 1.5s ease 1.1s',
          }}
        >
          <path
            d="M 0 0 C -35 -20, -65 -10, -80 20 C -50 25, -25 15, 0 0 Z"
            fill="url(#bouquetLeafGrad)"
          />
          <path
            d="M 0 0 C 35 -20, 65 -10, 80 20 C 50 25, 25 15, 0 0 Z"
            fill="url(#bouquetLeafGrad)"
          />
        </g>

        {/* --- 3 YELLOW BLOOM HEADS --- */}
        {/* Left Bloom Head (at x: 160, y: 360, angled -18deg) */}
        <g transform="translate(160, 360) rotate(-18)">
          {renderBloomHead(70, 1.3, false)}
        </g>

        {/* Right Bloom Head (at x: 440, y: 360, angled 18deg) */}
        <g transform="translate(440, 360) rotate(18)">
          {renderBloomHead(70, 1.4, false)}
        </g>

        {/* Center Main Bloom Head (at x: 300, y: 230, prominent) */}
        <g transform="translate(300, 230)">
          {renderBloomHead(95, 1.5, true)}
        </g>

        {/* --- GOLDEN RIBBON BOW TIED AT BASE --- */}
        <g
          transform="translate(300, 660)"
          style={{
            transformOrigin: '300px 660px',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1)' : 'scale(0.3)',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s',
          }}
        >
          {/* Left Ribbon Loop */}
          <path
            d="M 0 0 C -30 -35, -70 -20, -70 5 C -70 25, -30 20, 0 0 Z"
            fill="url(#ribbonGrad)"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
          />
          {/* Right Ribbon Loop */}
          <path
            d="M 0 0 C 30 -35, 70 -20, 70 5 C 70 25, 30 20, 0 0 Z"
            fill="url(#ribbonGrad)"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
          />
          {/* Left Hanging Tail */}
          <path
            d="M -5 5 C -20 30, -35 55, -45 80 C -35 75, -20 65, 0 10 Z"
            fill="url(#ribbonGrad)"
          />
          {/* Right Hanging Tail */}
          <path
            d="M 5 5 C 20 30, 35 55, 45 80 C 35 75, 20 65, 0 10 Z"
            fill="url(#ribbonGrad)"
          />
          {/* Center Knot */}
          <ellipse
            cx="0"
            cy="0"
            rx="12"
            ry="10"
            fill="#f59e0b"
            stroke="#fbbf24"
            strokeWidth="2"
            filter="drop-shadow(0 2px 6px rgba(0,0,0,0.5))"
          />
        </g>
      </svg>
    </div>
  );
}
