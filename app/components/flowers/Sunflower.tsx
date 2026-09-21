'use client';

import React from 'react';

export default function Sunflower({ isBlooming }: { isBlooming: boolean }) {
  // 24 outer petals, 18 inner petals
  const outerPetals = Array.from({ length: 24 }, (_, i) => i * 15);
  const innerPetals = Array.from({ length: 18 }, (_, i) => i * 20 + 10);

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
          {/* Stem gradient */}
          <linearGradient id="sunStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a1e" />
            <stop offset="50%" stopColor="#3d7a35" />
            <stop offset="100%" stopColor="#254d21" />
          </linearGradient>

          {/* Leaf gradient */}
          <linearGradient id="sunLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4d9b42" />
            <stop offset="60%" stopColor="#2d6a26" />
            <stop offset="100%" stopColor="#193d15" />
          </linearGradient>

          {/* Outer Petal Gradient */}
          <linearGradient id="sunOuterPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="25%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Inner Petal Gradient */}
          <linearGradient id="sunInnerPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Center Disk Radial Gradient */}
          <radialGradient id="sunCenterGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f1406" />
            <stop offset="45%" stopColor="#3d2407" />
            <stop offset="75%" stopColor="#573105" />
            <stop offset="90%" stopColor="#78350f" />
            <stop offset="97%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#fbbf24" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.98   0 1 0 0 0.75   0 0 1 0 0.15  0 0 0 1 0"
              result="goldGlowResult"
            />
            <feMerge>
              <feMergeNode in="goldGlowResult" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Petal shape template */}
          <path
            id="sunPetalPath"
            d="M 0 0 C -18 -40, -18 -100, 0 -138 C 18 -100, 18 -40, 0 0 Z"
          />
          <path
            id="sunPetalInnerPath"
            d="M 0 0 C -14 -35, -14 -85, 0 -115 C 14 -85, 14 -35, 0 0 Z"
          />
        </defs>

        {/* --- STEM --- */}
        <g className="origin-bottom">
          {/* Main Stem */}
          <path
            d="M 250 760 C 248 620, 240 460, 250 250"
            fill="none"
            stroke="url(#sunStemGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: isBlooming ? 0 : 600,
              transition: 'stroke-dashoffset 2.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />

          {/* Stem Highlight */}
          <path
            d="M 248 760 C 246 620, 238 460, 248 250"
            fill="none"
            stroke="rgba(134, 239, 172, 0.35)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: isBlooming ? 0 : 600,
              transition: 'stroke-dashoffset 2.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* --- LEAVES --- */}
        {/* Left Leaf */}
        <g
          transform="translate(244, 490)"
          style={{
            transformOrigin: '0% 0%',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-35deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s',
          }}
        >
          <path
            d="M 0 0 C -60 -10, -115 15, -150 75 C -110 110, -45 80, 0 0 Z"
            fill="url(#sunLeafGrad)"
            stroke="#1b4317"
            strokeWidth="2"
          />
          {/* Leaf rib & veins */}
          <path
            d="M 0 0 C -45 25, -90 45, -145 72"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="2.5"
            strokeOpacity="0.6"
          />
          <path
            d="M -35 15 C -45 5, -60 2, -75 5"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M -70 33 C -80 20, -100 20, -115 25"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </g>

        {/* Right Leaf */}
        <g
          transform="translate(248, 410)"
          style={{
            transformOrigin: '0% 0%',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(35deg)',
            transition: 'all 1.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s',
          }}
        >
          <path
            d="M 0 0 C 65 -15, 125 10, 160 65 C 120 100, 50 75, 0 0 Z"
            fill="url(#sunLeafGrad)"
            stroke="#1b4317"
            strokeWidth="2"
          />
          {/* Leaf rib & veins */}
          <path
            d="M 0 0 C 45 22, 95 40, 155 62"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="2.5"
            strokeOpacity="0.6"
          />
          <path
            d="M 40 16 C 55 5, 75 4, 90 8"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M 80 34 C 95 20, 120 22, 130 28"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </g>

        {/* --- FLOWER HEAD --- */}
        <g
          transform="translate(250, 250)"
          style={{
            transformOrigin: '250px 250px',
            opacity: isBlooming ? 1 : 0,
            transform: isBlooming ? 'scale(1)' : 'scale(0.15)',
            transition: 'all 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.4s',
          }}
        >
          {/* Ambient Head Glow */}
          <circle
            cx="0"
            cy="0"
            r="160"
            fill="url(#goldGlow)"
            opacity="0.35"
            className="animate-pulse"
          />

          {/* Outer Petals */}
          <g>
            {outerPetals.map((angle, idx) => (
              <g
                key={`outer-${idx}`}
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: '0 0',
                  opacity: isBlooming ? 1 : 0,
                  transform: isBlooming
                    ? `rotate(${angle}deg) scale(1)`
                    : `rotate(${angle}deg) scale(0.1)`,
                  transition: `all 1.4s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${1.6 + idx * 0.03}s`,
                }}
              >
                <use
                  href="#sunPetalPath"
                  fill="url(#sunOuterPetalGrad)"
                  filter="drop-shadow(0 2px 4px rgba(120, 53, 15, 0.35))"
                />
                {/* Petal fine vein line */}
                <line
                  x1="0"
                  y1="-10"
                  x2="0"
                  y2="-120"
                  stroke="rgba(245, 158, 11, 0.4)"
                  strokeWidth="1.5"
                />
              </g>
            ))}
          </g>

          {/* Inner Petals */}
          <g>
            {innerPetals.map((angle, idx) => (
              <g
                key={`inner-${idx}`}
                transform={`rotate(${angle})`}
                style={{
                  transformOrigin: '0 0',
                  opacity: isBlooming ? 1 : 0,
                  transform: isBlooming
                    ? `rotate(${angle}deg) scale(1)`
                    : `rotate(${angle}deg) scale(0.1)`,
                  transition: `all 1.3s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${2.0 + idx * 0.03}s`,
                }}
              >
                <use
                  href="#sunPetalInnerPath"
                  fill="url(#sunInnerPetalGrad)"
                  filter="drop-shadow(0 3px 6px rgba(120, 53, 15, 0.45))"
                />
              </g>
            ))}
          </g>

          {/* Calyx & Seed Center */}
          <circle
            cx="0"
            cy="0"
            r="64"
            fill="url(#sunCenterGrad)"
            stroke="#78350f"
            strokeWidth="3"
            filter="drop-shadow(0 0 12px rgba(245, 158, 11, 0.6))"
          />

          {/* Seed florets decorative concentric rings */}
          {[16, 28, 40, 52].map((radius, rIdx) => {
            const count = 10 + rIdx * 8;
            return (
              <g key={`ring-${rIdx}`} opacity="0.65">
                {Array.from({ length: count }).map((_, dIdx) => {
                  const rad = (dIdx * 360) / count * (Math.PI / 180);
                  const cx = Math.cos(rad) * radius;
                  const cy = Math.sin(rad) * radius;
                  return (
                    <circle
                      key={`dot-${rIdx}-${dIdx}`}
                      cx={cx}
                      cy={cy}
                      r={1.6 + (rIdx * 0.3)}
                      fill={rIdx === 3 ? '#fde047' : '#f59e0b'}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Center core highlight */}
          <circle cx="-10" cy="-12" r="14" fill="#fbbf24" opacity="0.15" />
        </g>
      </svg>
    </div>
  );
}
