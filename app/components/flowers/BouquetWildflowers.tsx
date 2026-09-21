'use client';

import React from 'react';

export default function BouquetWildflowers({ step = 5 }: { step?: number }) {
  const hasStems = step >= 1;
  const hasLeaves = step >= 2;
  const hasWrap = step >= 3;
  const hasBuds = step >= 4;
  const hasBloom = step >= 5;

  const petals = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);

  const renderWildflowerHead = (scale: number, delaySec: number) => {
    return (
      <g>
        {/* Calyx */}
        {hasBuds && <circle cx="0" cy="5" r="10" fill="#14532d" />}

        {/* Dynamic Blooming Wildflower */}
        <g
          style={{
            transformOrigin: '0px 0px',
            opacity: hasBuds ? 1 : 0,
            transform: hasBloom ? `scale(${scale})` : hasBuds ? `scale(${scale * 0.55})` : 'scale(0.001)',
            transition: `all 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.25) ${delaySec}s`,
          }}
        >
          {/* Ambient Glow */}
          {hasBloom && (
            <circle cx="0" cy="0" r="110" fill="rgba(254, 240, 138, 0.3)" filter="blur(14px)" />
          )}

          {/* Radiating Petals */}
          {petals.map((angle, idx) => (
            <g
              key={`wild-petal-${idx}`}
              style={{
                transformOrigin: '0px 0px',
                opacity: hasBloom ? 1 : 0,
                transform: hasBloom ? `rotate(${angle}deg) scale(1)` : `rotate(${angle}deg) scale(0.01)`,
                transition: `all 1.1s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.1 + idx * 0.015}s`,
              }}
            >
              <path
                d="M 0 0 C -7 -25, -9 -65, 0 -95 C 9 -65, 7 -25, 0 0 Z"
                fill="url(#wildPetalGrad)"
                filter="drop-shadow(0 2px 4px rgba(180, 83, 9, 0.25))"
              />
            </g>
          ))}

          {/* Central Button */}
          <circle
            cx="0"
            cy="0"
            r="32"
            fill="url(#wildCenterGrad)"
            stroke="#a16207"
            strokeWidth="2"
            filter="drop-shadow(0 2px 6px rgba(161, 98, 7, 0.4))"
          />
        </g>
      </g>
    );
  };

  return (
    <div
      className={`relative w-full h-full flex items-end justify-center origin-bottom transition-transform duration-700 ${
        hasBloom ? 'animate-sway' : ''
      }`}
    >
      <svg
        suppressHydrationWarning
        viewBox="0 0 600 780"
        className="w-auto h-full max-h-[70vh] sm:max-h-[75vh] overflow-visible drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="wildStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          <linearGradient id="wildLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="70%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>

          <linearGradient id="wildPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <radialGradient id="wildCenterGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
          </radialGradient>

          <linearGradient id="wrapPaperWild" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="60%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          <linearGradient id="wildRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* --- STEMS (5 STEMS) --- */}
        <g>
          <path
            d="M 300 760 C 270 650, 180 500, 150 360"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
          <path
            d="M 300 760 C 285 630, 230 450, 220 280"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: hasStems ? 0 : 560,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
            }}
          />
          <path
            d="M 300 760 C 298 620, 298 420, 300 210"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: hasStems ? 0 : 600,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
          <path
            d="M 300 760 C 315 630, 370 450, 380 280"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: hasStems ? 0 : 560,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
            }}
          />
          <path
            d="M 300 760 C 330 650, 420 500, 450 360"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* --- LEAVES --- */}
        <g>
          <g transform="translate(240, 560)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(-30deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.2s',
              }}
            >
              <path
                d="M 0 0 C -45 -10, -90 10, -115 50 C -75 60, -35 40, 0 0 Z"
                fill="url(#wildLeafGrad)"
              />
            </g>
          </g>
          <g transform="translate(360, 560)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(30deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.25s',
              }}
            >
              <path
                d="M 0 0 C 45 -10, 90 10, 115 50 C 75 60, 35 40, 0 0 Z"
                fill="url(#wildLeafGrad)"
              />
            </g>
          </g>
        </g>

        {/* --- 5 WILDFLOWER BLOOM HEADS --- */}
        <g transform="translate(150, 360) rotate(-18)">{renderWildflowerHead(0.75, 0.1)}</g>
        <g transform="translate(220, 280) rotate(-8)">{renderWildflowerHead(0.85, 0.2)}</g>
        <g transform="translate(450, 360) rotate(18)">{renderWildflowerHead(0.75, 0.15)}</g>
        <g transform="translate(380, 280) rotate(8)">{renderWildflowerHead(0.85, 0.25)}</g>
        <g transform="translate(300, 210)">{renderWildflowerHead(1.0, 0.3)}</g>

        {/* --- FLORAL WRAPPER & RIBBON --- */}
        <g transform="translate(300, 600)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasWrap ? 1 : 0,
              transform: hasWrap ? 'scale(1)' : 'scale(0.001)',
              transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.1s',
            }}
          >
            <path
              d="M -170 -120 L 170 -120 L 70 160 L -70 160 Z"
              fill="url(#wrapPaperWild)"
              stroke="#ca8a04"
              strokeWidth="2"
              filter="drop-shadow(0 8px 16px rgba(0,0,0,0.6))"
            />
            <path
              d="M -165 -110 L 60 -5 L -45 158 L -70 158 Z"
              fill="#27272a"
              stroke="#eab308"
              strokeWidth="1.8"
            />
            <path
              d="M 165 -110 L -60 -5 L 45 158 L 70 158 Z"
              fill="#18181b"
              stroke="#fbbf24"
              strokeWidth="2"
            />

            {/* Ribbon Bow */}
            <path
              d="M 0 0 C -40 -40, -85 -20, -85 10 C -85 35, -40 25, 0 0 Z"
              fill="url(#wildRibbon)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            <path
              d="M 0 0 C 40 -40, 85 -20, 85 10 C 85 35, 40 25, 0 0 Z"
              fill="url(#wildRibbon)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            <path
              d="M -8 5 C -25 35, -50 75, -65 110 C -50 100, -30 90, 0 12 Z"
              fill="url(#wildRibbon)"
            />
            <path
              d="M 8 5 C 25 35, 50 75, 65 110 C 50 100, 30 90, 0 12 Z"
              fill="url(#wildRibbon)"
            />
            <ellipse cx="0" cy="2" rx="15" ry="13" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
