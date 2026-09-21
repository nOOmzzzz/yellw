'use client';

import React from 'react';

export default function Bouquet({ step = 4 }: { step?: number }) {
  const hasStem = step >= 1;
  const hasLeaves = step >= 2;
  const hasBud = step >= 3;
  const hasBloom = step >= 4;

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
        {hasStem && (
          <path
            d={`M -${size * 0.2} 6 C -${size * 0.12} ${size * 0.28}, ${size * 0.12} ${size * 0.28}, ${size * 0.2} 6 C ${size * 0.08} 12, -${size * 0.08} 12, -${size * 0.2} 6 Z`}
            fill="#14532d"
          />
        )}

        {/* Dynamic Scaling Flower Head */}
        <g
          style={{
            transformOrigin: '0px 0px',
            opacity: hasBud ? 1 : 0,
            transform: hasBloom ? 'scale(1)' : hasBud ? 'scale(0.5)' : 'scale(0.001)',
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
              transform={`rotate(${angle})`}
              style={{
                transformOrigin: '0px 0px',
                opacity: hasBloom ? 1 : 0,
                transform: hasBloom ? `scale(1)` : `scale(0.01)`,
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
              transform={`rotate(${angle + 180 / petalCount})`}
              style={{
                transformOrigin: '0px 0px',
                opacity: hasBloom ? 0.9 : 0,
                transform: hasBloom
                  ? `scale(0.78)`
                  : `scale(0.01)`,
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
            className={hasBud && !hasBloom ? 'animate-pulse' : ''}
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

          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* --- GROUND MOUND --- */}
        <ellipse cx="300" cy="760" rx="90" ry="15" fill="#0c2310" opacity="0.8" />
        <ellipse cx="300" cy="760" rx="60" ry="9" fill="#14532d" opacity="0.6" />

        {/* --- STEMS (3 INTERTWINED STEMS) --- */}
        {/* Left Arching Stem to (160, 360) */}
        <path
          d="M 300 760 C 290 640, 200 480, 160 360"
          fill="none"
          stroke="url(#bouquetStemGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          style={{
            strokeDasharray: 550,
            strokeDashoffset: hasStem ? 0 : 550,
            transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />

        {/* Right Arching Stem to (440, 360) */}
        <path
          d="M 300 760 C 310 640, 400 480, 440 360"
          fill="none"
          stroke="url(#bouquetStemGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          style={{
            strokeDasharray: 550,
            strokeDashoffset: hasStem ? 0 : 550,
            transition: 'stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s',
          }}
        />

        {/* Center Tall Stem to (300, 230) */}
        <path
          d="M 300 760 C 298 620, 296 420, 300 230"
          fill="none"
          stroke="url(#bouquetStemGrad)"
          strokeWidth="13"
          strokeLinecap="round"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: hasStem ? 0 : 600,
            transition: 'stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />

        {/* --- LEAVES ALONG STEMS --- */}
        {/* Left lower leaf */}
        <g transform="translate(260, 560)">
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
              fill="url(#bouquetLeafGrad)"
              stroke="#14532d"
              strokeWidth="1.5"
            />
          </g>
        </g>

        {/* Right lower leaf */}
        <g transform="translate(340, 560)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasLeaves ? 1 : 0,
              transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(30deg)',
              transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.3s',
            }}
          >
            <path
              d="M 0 0 C 45 -10, 90 10, 115 50 C 75 60, 35 40, 0 0 Z"
              fill="url(#bouquetLeafGrad)"
              stroke="#14532d"
              strokeWidth="1.5"
            />
          </g>
        </g>

        {/* Left upper leaf */}
        <g transform="translate(190, 440)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasLeaves ? 1 : 0,
              transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(-20deg)',
              transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.4s',
            }}
          >
            <path
              d="M 0 0 C -40 -15, -75 0, -95 35 C -60 45, -30 30, 0 0 Z"
              fill="url(#bouquetLeafGrad)"
              stroke="#14532d"
              strokeWidth="1.5"
            />
          </g>
        </g>

        {/* Right upper leaf */}
        <g transform="translate(410, 440)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasLeaves ? 1 : 0,
              transform: hasLeaves ? 'scale(1) rotate(0deg)' : 'scale(0.001) rotate(20deg)',
              transition: 'all 1.4s cubic-bezier(0.34, 1.4, 0.64, 1) 0.5s',
            }}
          >
            <path
              d="M 0 0 C 40 -15, 75 0, 95 35 C 60 45, 30 30, 0 0 Z"
              fill="url(#bouquetLeafGrad)"
              stroke="#14532d"
              strokeWidth="1.5"
            />
          </g>
        </g>

        {/* Center stem leaves */}
        <g transform="translate(298, 410)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasLeaves ? 1 : 0,
              transform: hasLeaves ? 'scale(1)' : 'scale(0.001)',
              transition: 'all 1.3s ease 0.3s',
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
        </g>

        {/* --- 3 YELLOW BLOOM HEADS (Precisely anchored to stem tips) --- */}
        {/* Left Bloom Head: Anchor at exact stem tip (160, 360) */}
        <g transform="translate(160, 360) rotate(-18)">
          {renderBloomHead(70, 0.1, false)}
        </g>

        {/* Right Bloom Head: Anchor at exact stem tip (440, 360) */}
        <g transform="translate(440, 360) rotate(18)">
          {renderBloomHead(70, 0.2, false)}
        </g>

        {/* Center Main Bloom Head: Anchor at exact stem tip (300, 230) */}
        <g transform="translate(300, 230)">
          {renderBloomHead(95, 0.3, true)}
        </g>

        {/* --- GOLDEN RIBBON BOW TIED AT BASE --- */}
        <g transform="translate(300, 660)">
          <g
            style={{
              transformOrigin: '0px 0px',
              opacity: hasStem ? 1 : 0,
              transform: hasStem ? 'scale(1)' : 'scale(0.001)',
              transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s',
            }}
          >
            <path
              d="M 0 0 C -30 -35, -70 -20, -70 5 C -70 25, -30 20, 0 0 Z"
              fill="url(#ribbonGrad)"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
            />
            <path
              d="M 0 0 C 30 -35, 70 -20, 70 5 C 70 25, 30 20, 0 0 Z"
              fill="url(#ribbonGrad)"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
            />
            <path
              d="M -5 5 C -20 30, -35 55, -45 80 C -35 75, -20 65, 0 10 Z"
              fill="url(#ribbonGrad)"
            />
            <path
              d="M 5 5 C 20 30, 35 55, 45 80 C 35 75, 20 65, 0 10 Z"
              fill="url(#ribbonGrad)"
            />
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
        </g>
      </svg>
    </div>
  );
}
