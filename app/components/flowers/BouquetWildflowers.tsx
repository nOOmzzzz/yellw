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
            <stop offset="100%" stopColor="#fffdf5" />
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

          <linearGradient id="wrapInnerWild" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.12" />
          </linearGradient>

          <linearGradient id="wildRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        {/* ========================================================
            LAYER 1: BACK WRAPPER COLLAR (Sits BEHIND flowers & stems)
            ======================================================== */}
        <g
          style={{
            transformOrigin: '300px 720px',
            opacity: hasWrap ? 1 : 0,
            transform: hasWrap ? 'scale(1)' : 'scale(0.001)',
            transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.1s',
          }}
        >
          {/* Back Paper Flared Cone: cradles flowers */}
          <path
            d="M 230 730 L 75 290 Q 300 175 525 290 L 370 730 Z"
            fill="url(#wrapPaperWild)"
            stroke="#ca8a04"
            strokeWidth="2.5"
            filter="drop-shadow(0 12px 28px rgba(0,0,0,0.7))"
          />
          {/* Inner Golden Silky Lining */}
          <path
            d="M 240 710 L 95 305 Q 300 200 505 305 L 360 710 Z"
            fill="url(#wrapInnerWild)"
            stroke="rgba(250, 204, 21, 0.45)"
            strokeWidth="1.5"
          />
        </g>

        {/* ========================================================
            LAYER 2: STEMS (5 STEMS emerging from inside wrapper)
            ======================================================== */}
        <g>
          {/* Far Left Stem -> (150, 360) */}
          <path
            d="M 300 710 C 270 610, 180 480, 150 360"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
          {/* Inner Left Stem -> (220, 280) */}
          <path
            d="M 300 710 C 285 590, 230 440, 220 280"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: hasStems ? 0 : 560,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
            }}
          />
          {/* Center Tall Stem -> (300, 210) */}
          <path
            d="M 300 710 C 298 580, 298 400, 300 210"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: hasStems ? 0 : 600,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
          {/* Inner Right Stem -> (380, 280) */}
          <path
            d="M 300 710 C 315 590, 370 440, 380 280"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: hasStems ? 0 : 560,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
            }}
          />
          {/* Far Right Stem -> (450, 360) */}
          <path
            d="M 300 710 C 330 610, 420 480, 450 360"
            fill="none"
            stroke="url(#wildStemGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* ========================================================
            LAYER 3: LEAVES & GREENERY
            ======================================================== */}
        <g>
          <g transform="translate(230, 520)">
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
          <g transform="translate(370, 520)">
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

        {/* ========================================================
            LAYER 4: 5 WILDFLOWER BLOOM HEADS
            ======================================================== */}
        <g transform="translate(150, 360) rotate(-18)">{renderWildflowerHead(0.75, 0.1)}</g>
        <g transform="translate(220, 280) rotate(-8)">{renderWildflowerHead(0.85, 0.2)}</g>
        <g transform="translate(450, 360) rotate(18)">{renderWildflowerHead(0.75, 0.15)}</g>
        <g transform="translate(380, 280) rotate(8)">{renderWildflowerHead(0.85, 0.25)}</g>
        <g transform="translate(300, 210)">{renderWildflowerHead(1.0, 0.3)}</g>

        {/* ========================================================
            LAYER 5: FRONT WRAPPER CONE & SATIN RIBBON BOW
            (Covers lower stems and cradles the bouquet waist)
            ======================================================== */}
        <g
          style={{
            transformOrigin: '300px 720px',
            opacity: hasWrap ? 1 : 0,
            transform: hasWrap ? 'scale(1)' : 'scale(0.001)',
            transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.15s',
          }}
        >
          {/* Front Left Wrapper Diagonal Fold */}
          <path
            d="M 230 730 L 120 440 Q 280 480 370 455 L 360 730 Z"
            fill="url(#wrapPaperWild)"
            stroke="#eab308"
            strokeWidth="1.8"
            filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))"
          />

          {/* Front Right Overlapping Wrapper Fold (Origami V-collar) */}
          <path
            d="M 370 730 L 480 440 Q 320 475 230 455 L 240 730 Z"
            fill="#18181b"
            stroke="#fbbf24"
            strokeWidth="2"
            filter="drop-shadow(0 6px 14px rgba(0,0,0,0.6))"
          />

          {/* Metallic Gold Trim Lines */}
          <path d="M 120 440 Q 280 480 370 455" fill="none" stroke="#fde047" strokeWidth="2.5" />
          <path d="M 480 440 Q 320 475 230 455" fill="none" stroke="#facc15" strokeWidth="2.5" />

          {/* Ribbon Bow & Tails at y:610 */}
          <g transform="translate(300, 610)">
            <path
              d="M 0 0 C -45 -45, -90 -25, -90 10 C -90 35, -45 25, 0 0 Z"
              fill="url(#wildRibbon)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            <path
              d="M 0 0 C 45 -45, 90 -25, 90 10 C 90 35, 45 25, 0 0 Z"
              fill="url(#wildRibbon)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            <path
              d="M -8 5 C -28 35, -55 75, -70 115 C -55 105, -35 95, 0 12 Z"
              fill="url(#wildRibbon)"
              filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
            />
            <path
              d="M 8 5 C 28 35, 55 75, 70 115 C 55 105, 35 95, 0 12 Z"
              fill="url(#wildRibbon)"
              filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
            />
            <ellipse
              cx="0"
              cy="2"
              rx="16"
              ry="14"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="2.5"
              filter="drop-shadow(0 2px 6px rgba(0,0,0,0.6))"
            />
            <circle cx="-3" cy="-1" r="3.5" fill="#fffdf5" opacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}
