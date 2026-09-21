'use client';

import React from 'react';

export default function Bouquet({ step = 5 }: { step?: number }) {
  const hasStems = step >= 1;
  const hasLeaves = step >= 2;
  const hasWrap = step >= 3;
  const hasBuds = step >= 4;
  const hasBloom = step >= 5;

  const renderBloomHead = (
    size: number,
    delaySec: number,
    isCenter: boolean = false
  ) => {
    const petalCount = isCenter ? 20 : 16;
    const angles = Array.from({ length: petalCount }, (_, i) => (i * 360) / petalCount);

    return (
      <g>
        {/* Calyx connection to stem */}
        {hasBuds && (
          <path
            d={`M -${size * 0.2} 6 C -${size * 0.12} ${size * 0.28}, ${size * 0.12} ${size * 0.28}, ${size * 0.2} 6 C ${size * 0.08} 12, -${size * 0.08} 12, -${size * 0.2} 6 Z`}
            fill="#14532d"
          />
        )}

        {/* Dynamic Scaling Flower Head */}
        <g
          style={{
            transformOrigin: '0px 0px',
            opacity: hasBuds ? 1 : 0,
            transform: hasBloom ? 'scale(1)' : hasBuds ? 'scale(0.5)' : 'scale(0.001)',
            transition: `all 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.25) ${delaySec}s`,
          }}
        >
          {/* Ambient Glow */}
          {hasBloom && (
            <circle
              cx="0"
              cy="0"
              r={size * 1.6}
              fill="rgba(250, 204, 21, 0.35)"
              filter="blur(16px)"
            />
          )}

          {/* Petals */}
          {angles.map((angle, idx) => (
            <g
              key={`bouquet-petal-${idx}`}
              style={{
                transformOrigin: '0px 0px',
                opacity: hasBloom ? 1 : 0,
                transform: hasBloom
                  ? `rotate(${angle}deg) scale(1)`
                  : `rotate(${angle}deg) scale(0.01)`,
                transition: `all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.12 + idx * 0.02}s`,
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
              style={{
                transformOrigin: '0px 0px',
                opacity: hasBloom ? 0.9 : 0,
                transform: hasBloom
                  ? `rotate(${angle + 180 / petalCount}deg) scale(0.78)`
                  : `rotate(${angle + 180 / petalCount}deg) scale(0.01)`,
                transition: `all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${delaySec + 0.25 + idx * 0.02}s`,
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
            className={hasBuds && !hasBloom ? 'animate-pulse' : ''}
          />

          {/* Center Seed Dots */}
          {[0.15, 0.28].map((rFrac, rIdx) => {
            const dots = 7 + rIdx * 6;
            return (
              <g key={`core-ring-${rIdx}`}>
                {Array.from({ length: dots }).map((_, dIdx) => {
                  const rad = (dIdx * 360) / dots * (Math.PI / 180);
                  const cx = Math.round(Math.cos(rad) * (size * rFrac) * 100) / 100;
                  const cy = Math.round(Math.sin(rad) * (size * rFrac) * 100) / 100;
                  const r = Math.round(size * 0.035 * 100) / 100;
                  return (
                    <circle
                      key={`dot-${rIdx}-${dIdx}`}
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={rIdx === 1 ? '#fef08a' : '#d97706'}
                    />
                  );
                })}
              </g>
            );
          })}
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
          <linearGradient id="bouquetStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          <linearGradient id="bouquetLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>

          <linearGradient id="bouquetPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="75%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#fffbeb" />
          </linearGradient>

          <linearGradient id="bouquetInnerPetalGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>

          <radialGradient id="bouquetCoreGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>

          <linearGradient id="bouquetWrapOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="60%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          <linearGradient id="bouquetWrapInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        {/* --- STEMS (5 STEMS FORMING A DENSE FAN) --- */}
        <g>
          {/* Far Left Stem -> (150, 360) */}
          <path
            d="M 300 760 C 270 650, 190 500, 150 360"
            fill="none"
            stroke="url(#bouquetStemGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />

          {/* Inner Left Stem -> (220, 270) */}
          <path
            d="M 300 760 C 285 630, 230 450, 220 270"
            fill="none"
            stroke="url(#bouquetStemGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: hasStems ? 0 : 560,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
            }}
          />

          {/* Center Tall Stem -> (300, 200) */}
          <path
            d="M 300 760 C 298 620, 298 420, 300 200"
            fill="none"
            stroke="url(#bouquetStemGrad)"
            strokeWidth="13"
            strokeLinecap="round"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: hasStems ? 0 : 600,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />

          {/* Inner Right Stem -> (380, 270) */}
          <path
            d="M 300 760 C 315 630, 370 450, 380 270"
            fill="none"
            stroke="url(#bouquetStemGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: hasStems ? 0 : 560,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
            }}
          />

          {/* Far Right Stem -> (450, 360) */}
          <path
            d="M 300 760 C 330 650, 410 500, 450 360"
            fill="none"
            stroke="url(#bouquetStemGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            style={{
              strokeDasharray: 550,
              strokeDashoffset: hasStems ? 0 : 550,
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </g>

        {/* --- LEAVES & FLORAL FILLER FOLIAGE --- */}
        <g>
          {/* Left Wing Leaf */}
          <g transform="translate(240, 580)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(-35deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.2s',
              }}
            >
              <path
                d="M 0 0 C -60 -20, -130 0, -150 50 C -100 70, -40 50, 0 0 Z"
                fill="url(#bouquetLeafGrad)"
                stroke="#14532d"
                strokeWidth="1.5"
              />
            </g>
          </g>

          {/* Right Wing Leaf */}
          <g transform="translate(360, 580)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(35deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.25s',
              }}
            >
              <path
                d="M 0 0 C 60 -20, 130 0, 150 50 C 100 70, 40 50, 0 0 Z"
                fill="url(#bouquetLeafGrad)"
                stroke="#14532d"
                strokeWidth="1.5"
              />
            </g>
          </g>

          {/* Left Upper Foliage */}
          <g transform="translate(180, 440)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(-20deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.3s',
              }}
            >
              <path
                d="M 0 0 C -45 -30, -90 -15, -110 20 C -70 35, -30 25, 0 0 Z"
                fill="url(#bouquetLeafGrad)"
              />
            </g>
          </g>

          {/* Right Upper Foliage */}
          <g transform="translate(420, 440)">
            <g
              style={{
                transformOrigin: '0px 0px',
                opacity: hasLeaves ? 1 : 0,
                transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(20deg)',
                transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.35s',
              }}
            >
              <path
                d="M 0 0 C 45 -30, 90 -15, 110 20 C 70 35, 30 25, 0 0 Z"
                fill="url(#bouquetLeafGrad)"
              />
            </g>
          </g>
        </g>

        {/* --- 5 YELLOW BLOOM HEADS (EXUBERANT BOUQUET) --- */}
        {/* Outer Left Bloom -> (150, 360) */}
        <g transform="translate(150, 360) rotate(-20)">
          {renderBloomHead(65, 0.1, false)}
        </g>

        {/* Inner Left Bloom -> (220, 270) */}
        <g transform="translate(220, 270) rotate(-10)">
          {renderBloomHead(75, 0.2, false)}
        </g>

        {/* Outer Right Bloom -> (450, 360) */}
        <g transform="translate(450, 360) rotate(20)">
          {renderBloomHead(65, 0.15, false)}
        </g>

        {/* Inner Right Bloom -> (380, 270) */}
        <g transform="translate(380, 270) rotate(10)">
          {renderBloomHead(75, 0.25, false)}
        </g>

        {/* Center Main Bloom -> (300, 200) */}
        <g transform="translate(300, 200)">
          {renderBloomHead(95, 0.3, true)}
        </g>

        {/* --- FLORAL BOUQUET WRAPPER & GOLDEN SATIN RIBBON --- */}
        <g transform="translate(300, 600)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasWrap ? 1 : 0,
              transform: hasWrap ? 'scale(1)' : 'scale(0.001)',
              transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.1s',
            }}
          >
            {/* Back Paper Layer */}
            <path
              d="M -175 -130 L 175 -130 L 75 160 L -75 160 Z"
              fill="url(#bouquetWrapOuter)"
              stroke="#ca8a04"
              strokeWidth="2"
              filter="drop-shadow(0 8px 16px rgba(0,0,0,0.6))"
            />

            {/* Inner Decorative Translucent Fold */}
            <path
              d="M -155 -125 L 0 -20 L 155 -125 L 50 155 L -50 155 Z"
              fill="url(#bouquetWrapInner)"
              stroke="rgba(250, 204, 21, 0.5)"
              strokeWidth="1.5"
            />

            {/* Front Left Wrapper Fold */}
            <path
              d="M -170 -120 L 60 -10 L -45 158 L -75 158 Z"
              fill="url(#bouquetWrapOuter)"
              stroke="#eab308"
              strokeWidth="1.8"
            />

            {/* Front Right Wrapper Fold */}
            <path
              d="M 170 -120 L -60 -10 L 45 158 L 75 158 Z"
              fill="#18181b"
              stroke="#fbbf24"
              strokeWidth="2"
            />

            {/* Gold Ribbon Trim */}
            <line x1="-165" y1="-115" x2="60" y2="-8" stroke="#facc15" strokeWidth="2.5" />
            <line x1="165" y1="-115" x2="-60" y2="-8" stroke="#fde047" strokeWidth="2.5" />

            {/* --- SATIN RIBBON BOW & TAILS --- */}
            {/* Left Ribbon Loop */}
            <path
              d="M 0 0 C -40 -40, -85 -20, -85 10 C -85 35, -40 25, 0 0 Z"
              fill="url(#ribbonGrad)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            {/* Right Ribbon Loop */}
            <path
              d="M 0 0 C 40 -40, 85 -20, 85 10 C 85 35, 40 25, 0 0 Z"
              fill="url(#ribbonGrad)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />

            {/* Left Flowing Ribbon Tail */}
            <path
              d="M -8 5 C -25 35, -50 75, -65 110 C -50 100, -30 90, 0 12 Z"
              fill="url(#ribbonGrad)"
              filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
            />
            {/* Right Flowing Ribbon Tail */}
            <path
              d="M 8 5 C 25 35, 50 75, 65 110 C 50 100, 30 90, 0 12 Z"
              fill="url(#ribbonGrad)"
              filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
            />

            {/* Center Knot with Pearl Shine */}
            <ellipse
              cx="0"
              cy="2"
              rx="15"
              ry="13"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="2.5"
              filter="drop-shadow(0 2px 6px rgba(0,0,0,0.6))"
            />
            <circle cx="-3" cy="-1" r="3" fill="#ffffff" opacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}
